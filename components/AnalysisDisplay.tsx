import React from 'react';
import { Analysis } from '../types';
import { CLASSIFICATION_LABELS } from '../constants';

interface AnalysisDisplayProps {
  analysis: Analysis;
}

const InfoCard: React.FC<{ title: string; children: React.ReactNode; icon: string }> = ({ title, children, icon }) => (
  <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-700/50">
    <h3 className="text-lg font-bold text-teal-400 mb-4 flex items-center">
      <i className={`fas ${icon} ml-3 text-teal-500`}></i>
      {title}
    </h3>
    {children}
  </div>
);

const Pill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="bg-gray-700 text-teal-300 text-xs font-mono px-2 py-1 rounded-full">{children}</span>
);

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <header className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h1 className="text-4xl font-bold text-white mb-2" lang="en">{analysis.input}</h1>
        <div className="flex flex-wrap gap-2 items-center">
          <Pill>{CLASSIFICATION_LABELS[analysis.classification]}</Pill>
          <Pill>CEFR: {analysis.cefr_estimate}</Pill>
          <Pill>التسجيل: {analysis.register}</Pill>
          <Pill>الشيوع: {analysis.frequency}</Pill>
        </div>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InfoCard title="المعنى الأساسي والاستخدام" icon="fa-lightbulb">
          <p className="text-gray-300 leading-relaxed">{analysis.core_meaning_ar}</p>
        </InfoCard>

        <InfoCard title="النطق" icon="fa-volume-up">
          <div className="space-y-3">
            <div>
              <strong className="text-gray-400">IPA:</strong>
              <span className="text-lg font-mono text-cyan-300 mr-3" lang="en"> {analysis.pronunciation.ipa}</span>
            </div>
            <div><strong className="text-gray-400">الضغط (Stress):</strong> <span className="text-gray-300">{analysis.pronunciation.stress}</span></div>
            <div><strong className="text-gray-400">نصيحة النبرة:</strong> <span className="text-gray-300">{analysis.pronunciation.intonation_tip}</span></div>
          </div>
        </InfoCard>

        <InfoCard title="أمثلة" icon="fa-quote-right">
          <ul className="space-y-3 list-inside">
            <li><strong className="text-blue-400">غير رسمي:</strong> <span lang="en" className="text-gray-300 italic">"{analysis.examples.casual}"</span></li>
            <li><strong className="text-green-400">شبه رسمي:</strong> <span lang="en" className="text-gray-300 italic">"{analysis.examples.semi_formal}"</span></li>
            <li><strong className="text-purple-400">آيلتس:</strong> <span lang="en" className="text-gray-300 italic">"{analysis.examples.ielts}"</span></li>
          </ul>
        </InfoCard>

        <InfoCard title="تمارين" icon="fa-dumbbell">
          <div className="space-y-3">
            <div><strong className="text-gray-400">املأ الفراغ:</strong> <p lang="en" className="text-gray-300 italic">{analysis.drills.cloze}</p></div>
            <div><strong className="text-gray-400">إعادة صياغة:</strong> <p className="text-gray-300">{analysis.drills.paraphrase}</p></div>
            <div><strong className="text-gray-400">إنتاج:</strong> <p className="text-gray-300">{analysis.drills.production}</p></div>
          </div>
        </InfoCard>
        
        <div className="lg:col-span-2">
            <InfoCard title="معلومات إضافية" icon="fa-info-circle">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                    <div>
                        <h4 className="font-semibold text-gray-200 mb-2">تلازمات لفظية (Collocations)</h4>
                        <div className="flex flex-wrap gap-2">
                            {analysis.collocations.map((c, i) => <Pill key={i}>{c}</Pill>)}
                        </div>
                    </div>
                     <div>
                        <h4 className="font-semibold text-gray-200 mb-2">مصطلحات متعلقة</h4>
                        <div className="flex flex-wrap gap-2">
                            {analysis.related_terms && analysis.related_terms.length > 0 ? 
                                analysis.related_terms.map((term, i) => <Pill key={i}>{term}</Pill>) :
                                <span className="text-gray-500 text-sm">لا يوجد.</span>
                            }
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-200 mb-2">أنماط وقوالب</h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-300">
                            {analysis.patterns.map((p, i) => <li key={i}>{p}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-200 mb-2">أخطاء شائعة</h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-300">
                            {analysis.common_pitfalls.map((p, i) => <li key={i}>{p}</li>)}
                        </ul>
                    </div>
                     <div className="md:col-span-2">
                        <h4 className="font-semibold text-gray-200 mb-2">فروقات UK/US</h4>
                        <div className="bg-gray-900/50 p-4 rounded-md">
                            <p className="text-gray-300 mb-3"><strong className="text-gray-400">الشيوع:</strong> {analysis.uk_vs_us.commonality}</p>
                            {analysis.uk_vs_us.uk_equivalents.length > 0 && (
                                <div className="mb-3">
                                    <strong className="text-gray-400">مرادفات بريطانية:</strong>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {analysis.uk_vs_us.uk_equivalents.map((eq, i) => <Pill key={i}>{eq}</Pill>)}
                                    </div>
                                </div>
                            )}
                            {analysis.uk_vs_us.us_equivalents.length > 0 && (
                                <div className="mb-3">
                                    <strong className="text-gray-400">مرادفات أمريكية:</strong>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {analysis.uk_vs_us.us_equivalents.map((eq, i) => <Pill key={i}>{eq}</Pill>)}
                                    </div>
                                </div>
                            )}
                            <p className="text-gray-300 text-sm"><strong className="text-gray-400">ملاحظات:</strong> {analysis.uk_vs_us.notes}</p>
                        </div>
                     </div>
                </div>
            </InfoCard>
        </div>
         <div className="lg:col-span-2">
            <InfoCard title="استمع للمتحدثين الأصليين" icon="fa-headphones-alt">
                <div className="flex space-x-4 space-x-reverse">
                    <a href={`https://youglish.com/pronounce/${encodeURIComponent(analysis.listening_links.youglish_us)}/english/us`} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-colors">
                        <i className="fas fa-flag-usa ml-2"></i> نطق أمريكي (YouGlish)
                    </a>
                    <a href={`https://youglish.com/pronounce/${encodeURIComponent(analysis.listening_links.youglish_uk)}/english/uk`} target="_blank" rel="noopener noreferrer" className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 transition-colors">
                        <i className="fas fa-flag ml-2"></i> نطق بريطاني (YouGlish)
                    </a>
                </div>
            </InfoCard>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDisplay;