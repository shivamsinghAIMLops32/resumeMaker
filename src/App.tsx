import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';
import EditorPane from './components/editor/EditorPane';
import PreviewPane from './components/preview/PreviewPane';
import useResumeStore from './store/useResumeStore';
import Footer from './components/ui/Footer';

function App() {
  const { darkMode, toggleDarkMode } = useResumeStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePane, setActivePane] = useState<'editor' | 'preview'>('editor');

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md px-4 py-3 md:px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.h1 
            className="text-2xl font-bold text-indigo-600 dark:text-indigo-400"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            ResumeForge
          </motion.h1>
          
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => toggleDarkMode()}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white dark:bg-gray-800 shadow-lg"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 py-3 space-y-2">
              <button
                onClick={() => {
                  setActivePane('editor');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-md ${
                  activePane === 'editor' 
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                Editor
              </button>
              <button
                onClick={() => {
                  setActivePane('preview');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-md ${
                  activePane === 'preview' 
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                Preview
              </button>
              <button
                onClick={() => {
                  toggleDarkMode();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center px-3 py-2 rounded-md text-gray-600 dark:text-gray-300"
              >
                {darkMode ? <Sun size={16} className="mr-2" /> : <Moon size={16} className="mr-2" />}
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow flex flex-col md:flex-row">
        <div className={`${activePane === 'editor' ? 'block' : 'hidden'} md:block md:w-1/2 lg:w-2/5 overflow-y-auto p-4`}>
          <EditorPane />
        </div>
        <div className={`${activePane === 'preview' ? 'block' : 'hidden'} md:block md:w-1/2 lg:w-3/5 overflow-y-auto p-4 bg-gray-100 dark:bg-gray-800`}>
          <PreviewPane />
        </div>
      </main>

      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg-up flex z-10">
        <button
          onClick={() => setActivePane('editor')}
          className={`flex-1 py-3 ${
            activePane === 'editor' 
              ? 'text-indigo-600 border-t-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400' 
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          Editor
        </button>
        <button
          onClick={() => setActivePane('preview')}
          className={`flex-1 py-3 ${
            activePane === 'preview' 
              ? 'text-indigo-600 border-t-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400' 
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          Preview
        </button>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;