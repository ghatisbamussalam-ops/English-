import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import InputForm from './components/InputForm';
import AnalysisDisplay from './components/AnalysisDisplay';
import { analyzePhrase } from './services/geminiService';
import { Analysis } from './types';

const App: React.FC = () => {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState<Analysis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [phrase, setPhrase] = useState('');

  useEffect(() => {
    try {
      const savedAnalyses = localStorage.getItem('english-phrase-analyzer');
      if (savedAnalyses) {
        setAnalyses(JSON.parse(savedAnalyses));
      }
    } catch (e) {
      console.error("Failed to load analyses from localStorage", e);
      setAnalyses([]);
    }
  }, []);

  const handleAnalyze = async () => {
    if (!phrase.trim()) return;

    setIsLoading(true);
    setError(null);
    setSelectedAnalysis(null);
    
    const searchTerm = phrase.trim();
    const existingAnalysis = analyses.find(a => a.input.toLowerCase() === searchTerm.toLowerCase());
    if (existingAnalysis) {
        setSelectedAnalysis(existingAnalysis);
        setIsLoading(false);
        return;
    }

    try {
      const newAnalysis = await analyzePhrase(searchTerm);
      
      setAnalyses(prev => {
        const updatedAnalyses = [newAnalysis, ...prev.filter(a => a.input.toLowerCase() !== newAnalysis.input.toLowerCase())];
        localStorage.setItem('english-phrase-analyzer', JSON.stringify(updatedAnalyses));
        return updatedAnalyses;
      });
      setSelectedAnalysis(newAnalysis);

    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSelectAnalysis = useCallback((analysis: Analysis) => {
    setSelectedAnalysis(analysis);
    setPhrase(analysis.input);
    if(window.innerWidth < 1024) {
        setIsSidebarOpen(false);
    }
  }, []);

  const handleClearHistory = () => {
    if(window.confirm("هل أنت متأكد أنك تريد مسح كل السجل؟ لا يمكن التراجع عن هذا الإجراء.")) {
        setAnalyses([]);
        setSelectedAnalysis(null);
        setPhrase('');
        localStorage.removeItem('english-phrase-analyzer');
    }
  };

  const handleNewAnalysis = () => {
    setSelectedAnalysis(null);
    setError(null);
    setPhrase('');
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200 overflow-hidden">
        <div className={`fixed lg:relative top-0 right-0 h-full z-20 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0`}>
             <Sidebar
                analyses={analyses}
                selectedInput={selectedAnalysis?.input || null}
                onSelect={handleSelectAnalysis}
                onClearHistory={handleClearHistory}
              />
        </div>

      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4 gap-4">
                 <div className="flex items-center gap-4 flex-wrap">
                    <h1 className="text-3xl font-bold text-white">محلل العبارات الإنجليزية</h1>
                    <button
                        onClick={handleNewAnalysis}
                        className="bg-teal-600/80 text-white font-bold py-2 px-4 rounded-md hover:bg-teal-500 transition-colors text-sm"
                        aria-label="بدء تحليل جديد"
                    >
                        <i className="fas fa-plus mr-2"></i> تحليل جديد
                    </button>
                </div>
                 <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden z-30 p-2 text-2xl">
                    <i className={`fas ${isSidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </button>
            </div>
            <p className="text-gray-400 mb-6">
                أداة تعليمية مدعومة بالذكاء الاصطناعي لتحليل المفردات والتراكيب الإنجليزية بعمق.
            </p>

          <InputForm 
            onSubmit={handleAnalyze} 
            isLoading={isLoading}
            phrase={phrase}
            onPhraseChange={setPhrase}
          />
          
          {isLoading && (
            <div className="text-center p-8">
              <i className="fas fa-spinner fa-spin text-4xl text-teal-400"></i>
              <p className="mt-4 text-lg">جاري التحليل... قد يستغرق الأمر بضع ثوانٍ.</p>
            </div>
          )}

          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg">
              <h3 className="font-bold">حدث خطأ</h3>
              <p>{error}</p>
            </div>
          )}

          {selectedAnalysis && !isLoading && (
            <AnalysisDisplay analysis={selectedAnalysis} />
          )}

          {!selectedAnalysis && !isLoading && !error && (
            <div className="text-center p-8 bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-700">
                <i className="fas fa-search text-5xl text-gray-600 mb-4"></i>
                <h2 className="text-2xl font-semibold text-gray-400">ابدأ رحلتك التعليمية</h2>
                <p className="text-gray-500 mt-2">أدخل كلمة، مصطلحًا، أو جملة إنجليزية في الحقل أعلاه لعرض تحليلها المفصل.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;