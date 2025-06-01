import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Printer } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import useResumeStore from '../../store/useResumeStore';
import ModernLayout from './layouts/ModernLayout';
import ClassicLayout from './layouts/ClassicLayout';
import MinimalLayout from './layouts/MinimalLayout';
import CreativeLayout from './layouts/CreativeLayout';

const PreviewPane: React.FC = () => {
  const { layout, accentColor } = useResumeStore();
  const resumeRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
    documentTitle: 'Resume',
    // Remove header and footer from print
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .no-print {
          display: none !important;
        }
      }
    `,
  });
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <motion.h2 
          className="text-lg font-semibold text-gray-800 dark:text-gray-200"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          Resume Preview
        </motion.h2>
        
        <div className="flex space-x-2">
          <button
            onClick={handlePrint}
            className="btn btn-secondary flex items-center text-xs"
            title="Print Resume"
          >
            <Printer size={14} className="mr-1" />
            Print
          </button>
          <button
            onClick={handlePrint}
            className="btn btn-primary flex items-center text-xs"
            title="Download as PDF"
          >
            <Download size={14} className="mr-1" />
            Download PDF
          </button>
        </div>
      </div>
      
      <div className="flex-grow bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-auto flex justify-center p-4">
        <div 
          ref={resumeRef}
          className="resume-preview w-full max-w-[21cm] bg-white shadow-lg"
          style={{ minHeight: '29.7cm' }}
        >
          {layout === 'modern' && <ModernLayout />}
          {layout === 'classic' && <ClassicLayout />}
          {layout === 'minimal' && <MinimalLayout />}
          {layout === 'creative' && <CreativeLayout />}
        </div>
      </div>
    </div>
  );
};

export default PreviewPane;