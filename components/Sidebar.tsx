
import React from 'react';
import { Analysis, AnalysisClassification } from '../types';
import { CLASSIFICATION_LABELS } from '../constants';

interface SidebarProps {
  analyses: Analysis[];
  selectedInput: string | null;
  onSelect: (analysis: Analysis) => void;
  onClearHistory: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ analyses, selectedInput, onSelect, onClearHistory }) => {
  const groupedAnalyses = analyses.reduce((acc, analysis) => {
    const key = analysis.classification || AnalysisClassification.UNKNOWN;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(analysis);
    return acc;
  }, {} as Record<AnalysisClassification, Analysis[]>);

  const sortedGroups = Object.keys(groupedAnalyses).sort() as AnalysisClassification[];

  return (
    <aside className="w-80 bg-gray-900/80 backdrop-blur-sm border-l border-gray-700/50 p-4 flex flex-col h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-teal-400">السجل</h2>
        <button 
          onClick={onClearHistory}
          className="text-gray-400 hover:text-red-500 transition-colors text-sm"
          aria-label="مسح السجل"
        >
          <i className="fas fa-trash-alt mr-1"></i> مسح الكل
        </button>
      </div>
      <nav className="flex-grow">
        {analyses.length === 0 ? (
          <p className="text-gray-500 text-center mt-8">لا توجد سجلات بعد.</p>
        ) : (
          <ul className="space-y-4">
            {sortedGroups.map((groupKey) => (
              <li key={groupKey}>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  {CLASSIFICATION_LABELS[groupKey] || groupKey}
                </h3>
                <ul className="space-y-1">
                  {groupedAnalyses[groupKey].map((analysis) => (
                    <li key={analysis.input}>
                      <button
                        onClick={() => onSelect(analysis)}
                        className={`w-full text-right px-3 py-2 rounded-md transition-colors text-sm truncate ${
                          selectedInput === analysis.input
                            ? 'bg-teal-500/20 text-teal-300 font-semibold'
                            : 'text-gray-300 hover:bg-gray-700/50'
                        }`}
                      >
                        {analysis.input}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
