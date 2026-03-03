import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  ChevronRight, 
  Search, 
  GraduationCap, 
  Calculator, 
  ArrowLeft,
  Sparkles,
  MessageSquare,
  Layers,
  Phone,
  MapPin,
  Facebook
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { MATH_DATA, ClassLevel, Chapter, Topic } from './constants';
import { solveMathProblem } from './services/geminiService';
import { cn } from './lib/utils';

export default function App() {
  const [selectedClass, setSelectedClass] = useState<ClassLevel | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSolve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!problem.trim() || !selectedClass || !selectedChapter) return;

    setIsLoading(true);
    setSolution(null);
    try {
      const result = await solveMathProblem(
        problem, 
        selectedClass.name, 
        selectedChapter.title,
        selectedTopic?.title
      );
      setSolution(result || "কোন সমাধান পাওয়া যায়নি।");
    } catch (error) {
      setSolution("সমাধান খোঁজার সময় একটি ত্রুটি ঘটেছে।");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredChapters = selectedClass?.chapters.filter(chapter => 
    chapter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chapter.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resetToClasses = () => {
    setSelectedClass(null);
    setSelectedChapter(null);
    setSelectedTopic(null);
    setSolution(null);
    setProblem('');
    setSearchQuery('');
  };

  const resetToChapters = () => {
    setSelectedChapter(null);
    setSelectedTopic(null);
    setSolution(null);
    setProblem('');
    setSearchQuery('');
  };

  const resetToTopics = () => {
    setSelectedTopic(null);
    setSolution(null);
    setProblem('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={resetToClasses}
          >
            <div className="h-12 w-auto overflow-hidden rounded-lg border border-slate-700 shadow-lg">
              <img 
                src="https://storage.googleapis.com/file-extract.appspot.com/v0/b/file-extract.appspot.com/o/71498233503%2F1741025660682_logo.png?alt=media" 
                alt="সোহেল স্যার লোগো" 
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-xl tracking-tight leading-tight text-white">সোহেল স্যার</h1>
              <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest leading-none">ম্যাথ প্রাইভেট প্রোগ্রাম</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={resetToClasses} className="text-sm font-medium text-slate-400 hover:text-indigo-400 transition-colors">শ্রেণীসমূহ</button>
            <a href="https://modeltestregistrationsgch.created.app/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-400 hover:text-indigo-400 transition-colors">মডেল টেস্ট রেজিস্ট্রেশন</a>
            <a href="https://sohelsirsmath.created.app/" target="_blank" rel="noopener noreferrer" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-900/20">এখনই ভর্তি হও</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {!selectedClass ? (
            /* Class Selection View */
            <motion.div
              key="classes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="text-center space-y-6 max-w-3xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-bold tracking-wide mb-2"
                >
                  সোহেল স্যার ম্যাথ হাব
                </motion.div>
                <h2 className="text-4xl font-extrabold text-white sm:text-6xl tracking-tight leading-[1.1]">
                  গণিতে দক্ষ হও <span className="text-indigo-500">সোহেল স্যারের</span> সাথে
                </h2>
                <p className="text-lg text-slate-400 leading-relaxed">
                  ৭ম থেকে ১০ম শ্রেণীর গণিত বইয়ের প্রতিটি সমস্যার সহজ সমাধান। শুরু করতে তোমার শ্রেণী নির্বাচন করো।
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {MATH_DATA.map((cls) => (
                  <motion.button
                    key={cls.id}
                    whileHover={{ scale: 1.02, translateY: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedClass(cls)}
                    className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-500/30 transition-all text-left group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-600/5 blur-3xl rounded-full -mr-12 -mt-12 group-hover:bg-indigo-600/10 transition-colors" />
                    <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-indigo-400 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                      <GraduationCap size={28} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-white">{cls.name}</h3>
                    <p className="text-slate-500 text-sm mb-4 leading-relaxed">পাঠ্যবইয়ের সকল অধ্যায়ের সমাধান ও প্র্যাকটিস।</p>
                    <div className="flex items-center text-indigo-400 font-bold text-sm group-hover:translate-x-1 transition-transform">
                      অধ্যায়গুলো দেখো <ChevronRight size={16} className="ml-1" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : !selectedChapter ? (
            /* Chapter Selection View */
            <motion.div
              key="chapters"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <button 
                  onClick={resetToClasses}
                  className="flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors font-bold w-fit bg-slate-900 px-4 py-2 rounded-lg border border-slate-800"
                >
                  <ArrowLeft size={18} /> শ্রেণী নির্বাচনে ফিরে যাও
                </button>
                
                <div className="relative max-w-md w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    type="text"
                    placeholder="অধ্যায় বা বিষয় খুঁজুন..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-white placeholder:text-slate-600"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h2 className="text-3xl font-bold text-white">{selectedClass.name} - অধ্যায়সমূহ</h2>
                <div className="bg-indigo-500/10 text-indigo-400 px-4 py-1.5 rounded-full text-sm font-bold border border-indigo-500/20">
                  {filteredChapters?.length} টি অধ্যায়
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredChapters?.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => setSelectedChapter(chapter)}
                    className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-indigo-500/30 hover:bg-slate-800/50 transition-all text-left flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-slate-500 group-hover:bg-indigo-500/10 group-hover:text-indigo-400 transition-colors">
                        <BookOpen size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-white group-hover:text-indigo-400 transition-colors">{chapter.title}</h4>
                        <p className="text-slate-500 text-sm mt-1">{chapter.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="text-slate-700 group-hover:text-indigo-500 transition-colors" />
                  </button>
                ))}
                {filteredChapters?.length === 0 && (
                  <div className="col-span-full py-16 text-center bg-slate-900 rounded-2xl border border-dashed border-slate-800">
                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-600">
                      <Search size={32} />
                    </div>
                    <p className="text-slate-500 font-medium">দুঃখিত, কোনো অধ্যায় খুঁজে পাওয়া যায়নি।</p>
                  </div>
                )}
              </div>
            </motion.div>
          ) : !selectedTopic ? (
            /* Topic Selection View */
            <motion.div
              key="topics"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-3xl mx-auto space-y-8"
            >
              <button 
                onClick={resetToChapters}
                className="flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors font-bold bg-slate-900 px-4 py-2 rounded-lg border border-slate-800"
              >
                <ArrowLeft size={18} /> অধ্যায় নির্বাচনে ফিরে যাও
              </button>

              <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 blur-[100px] -mr-32 -mt-32" />
                
                <div className="relative space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm uppercase tracking-wider">
                      <Layers size={16} /> টপিক নির্বাচন
                    </div>
                    <h2 className="text-3xl font-bold text-white">{selectedChapter.title}</h2>
                    <p className="text-slate-400">{selectedChapter.description}</p>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {selectedChapter.topics.map((topic) => (
                      <button
                        key={topic.id}
                        onClick={() => setSelectedTopic(topic)}
                        className="flex items-center justify-between p-5 bg-slate-800/50 hover:bg-indigo-500/10 border border-slate-700 hover:border-indigo-500/30 rounded-2xl transition-all group"
                      >
                        <span className="font-bold text-slate-200 group-hover:text-white">{topic.title}</span>
                        <ChevronRight size={20} className="text-slate-600 group-hover:text-indigo-400 transition-colors" />
                      </button>
                    ))}
                    <button
                      onClick={() => setSelectedTopic({ id: 'general', title: 'সাধারণ প্রশ্ন' })}
                      className="flex items-center justify-between p-5 bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 hover:border-indigo-500/40 rounded-2xl transition-all group"
                    >
                      <span className="font-bold text-indigo-400">এই অধ্যায় থেকে যেকোনো প্রশ্ন করো</span>
                      <Sparkles size={20} className="text-indigo-400" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Problem Solver View */
            <motion.div
              key="solver"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl mx-auto space-y-8"
            >
              <button 
                onClick={resetToTopics}
                className="flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors font-bold bg-slate-900 px-4 py-2 rounded-lg border border-slate-800"
              >
                <ArrowLeft size={18} /> টপিক নির্বাচনে ফিরে যাও
              </button>

              <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
                <div className="p-8 border-b border-slate-800 bg-slate-900/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 blur-[100px] -mr-32 -mt-32" />
                  <div className="relative">
                    <div className="flex items-center gap-2 text-indigo-400 mb-3">
                      <Sparkles size={20} />
                      <span className="text-xs font-bold uppercase tracking-widest">AI ম্যাথ অ্যাসিস্ট্যান্ট</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedTopic.title}</h2>
                    <p className="text-slate-500 font-medium">{selectedClass.name} • {selectedChapter.title}</p>
                  </div>
                </div>

                <div className="p-8 space-y-8">
                  <form onSubmit={handleSolve} className="space-y-6">
                    <div className="relative">
                      <textarea
                        value={problem}
                        onChange={(e) => setProblem(e.target.value)}
                        placeholder="তোমার গণিত সমস্যাটি এখানে লেখো (যেমন: সমাধান করো: 2x + 5 = 15)..."
                        className="w-full min-h-[180px] p-6 rounded-2xl bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none text-lg text-white placeholder:text-slate-600 shadow-inner"
                      />
                      <div className="absolute bottom-4 right-4 text-slate-600">
                        <MessageSquare size={24} />
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isLoading || !problem.trim()}
                      className={cn(
                        "w-full py-5 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-3 shadow-xl",
                        isLoading || !problem.trim() 
                          ? "bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700" 
                          : "bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] shadow-indigo-900/40"
                      )}
                    >
                      {isLoading ? (
                        <>
                          <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                          AI সমাধান তৈরি করছে...
                        </>
                      ) : (
                        <>
                          <Sparkles size={22} />
                          ধাপে ধাপে সমাধান দেখো
                        </>
                      )}
                    </button>
                  </form>

                  {solution && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-12 space-y-6"
                    >
                      <div className="flex items-center gap-3 text-white border-b border-slate-800 pb-4">
                        <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center border border-emerald-500/20">
                          <Calculator size={22} />
                        </div>
                        <h3 className="font-bold text-xl">সমাধান</h3>
                      </div>
                      <div className="prose prose-invert max-w-none bg-slate-800/50 p-8 rounded-2xl border border-slate-700 shadow-inner">
                        <ReactMarkdown>{solution}</ReactMarkdown>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Tips Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex gap-4 items-start">
                  <div className="text-indigo-400 bg-indigo-500/10 p-2 rounded-lg"><Sparkles size={20} /></div>
                  <div>
                    <h5 className="font-bold text-white text-sm">সুনির্দিষ্ট হও</h5>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">প্রশ্নের সকল সংখ্যা ও চলক সঠিকভাবে দাও।</p>
                  </div>
                </div>
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex gap-4 items-start">
                  <div className="text-indigo-400 bg-indigo-500/10 p-2 rounded-lg"><BookOpen size={20} /></div>
                  <div>
                    <h5 className="font-bold text-white text-sm">মূল ধারণা শেখো</h5>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">সমাধানের প্রতিটি ধাপ বোঝার চেষ্টা করো।</p>
                  </div>
                </div>
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex gap-4 items-start">
                  <div className="text-indigo-400 bg-indigo-500/10 p-2 rounded-lg"><Calculator size={20} /></div>
                  <div>
                    <h5 className="font-bold text-white text-sm">বেশি প্র্যাকটিস করো</h5>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">একই ধরণের আরও অংক নিজে নিজে করার চেষ্টা করো।</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-900/20">
                  <Calculator size={22} />
                </div>
                <h4 className="font-bold text-xl text-white">সোহেল স্যার</h4>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                গণিতে শ্রেষ্ঠত্ব অর্জনে শিক্ষার্থীদের পাশে। আমরা বিশ্বাস করি সঠিক দিকনির্দেশনা এবং নিয়মিত অনুশীলনের মাধ্যমে যেকোনো শিক্ষার্থী গণিতে দক্ষ হতে পারে।
              </p>
            </div>

            <div className="space-y-6">
              <h5 className="font-bold text-white uppercase tracking-wider text-sm">যোগাযোগ</h5>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 text-slate-400 text-sm group">
                  <div className="text-indigo-400 bg-indigo-500/10 p-2 rounded-lg group-hover:bg-indigo-500 group-hover:text-white transition-all"><Phone size={18} /></div>
                  <a href="tel:01712751919" className="hover:text-indigo-400 transition-colors">01712751919</a>
                </li>
                <li className="flex items-center gap-4 text-slate-400 text-sm">
                  <div className="text-indigo-400 bg-indigo-500/10 p-2 rounded-lg"><MapPin size={18} /></div>
                  <span>জলেশ্বরীতলা, বগুড়া (Jaleshwaritala, Bogura)</span>
                </li>
                <li className="flex items-center gap-4 text-slate-400 text-sm group">
                  <div className="text-indigo-400 bg-indigo-500/10 p-2 rounded-lg group-hover:bg-indigo-500 group-hover:text-white transition-all"><Facebook size={18} /></div>
                  <a 
                    href="https://www.facebook.com/share/1Dbf7kox8r/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-indigo-400 transition-colors font-bold"
                  >
                    M Hasan Shohel
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h5 className="font-bold text-white uppercase tracking-wider text-sm">দ্রুত লিঙ্ক</h5>
              <div className="flex flex-col gap-3">
                <button onClick={resetToClasses} className="text-sm text-slate-400 hover:text-indigo-400 transition-colors text-left">শ্রেণীসমূহ</button>
                <a href="https://modeltestregistrationsgch.created.app/" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">মডেল টেস্ট রেজিস্ট্রেশন</a>
                <a href="https://sohelsirsmath.created.app/" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">এখনই ভর্তি হও</a>
              </div>
              <div className="pt-6 border-t border-slate-800">
                <p className="text-slate-600 text-xs">© ২০২৪ সোহেল স্যার। সর্বস্বত্ব সংরক্ষিত।</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
