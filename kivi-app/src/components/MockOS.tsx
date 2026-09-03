import React from 'react';
import { Mail, Terminal, Sparkles } from 'lucide-react';

export default function MockOS({ activeText }: { activeText: string }) {
  return (
    <div className="absolute inset-0 p-8 grid grid-cols-2 grid-rows-2 gap-6 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center">
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Slack/Email App */}
      <div className="relative glass rounded-xl flex flex-col overflow-hidden col-span-1 row-span-1 shadow-2xl">
        <div className="h-10 bg-white/10 flex items-center px-4 gap-2 border-b border-white/10">
          <Mail className="w-4 h-4 text-white/70" />
          <span className="text-sm text-white/70 font-medium">Daily Comms (Email/Slack)</span>
        </div>
        <div className="flex-1 p-6 text-white/80 font-serif leading-relaxed flex flex-col gap-4">
          <p>Hi Team,</p>
          <p>Just wanted to provide a quick update on the latest deployment.</p>
          <div className="flex-1 relative">
            <span className="opacity-50">Type your message here... </span>
            <span className="text-emerald-300 font-medium">{activeText}</span>
            <span className="inline-block w-0.5 h-5 bg-emerald-400 animate-pulse align-middle ml-1" />
          </div>
        </div>
      </div>

      {/* VS Code */}
      <div className="relative glass-dark rounded-xl flex flex-col overflow-hidden col-span-1 row-span-2 shadow-2xl border-white/5">
        <div className="h-10 bg-black/40 flex items-center px-4 gap-2 border-b border-white/5">
          <Terminal className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-white/70 font-mono">VS Code - backend.ts</span>
        </div>
        <div className="flex-1 p-6 text-emerald-400/80 font-mono text-sm leading-loose">
          <p className="text-blue-400">import <span className="text-yellow-200">{'{'} Server {'}'}</span> from 'infrastructure';</p>
          <br/>
          <p className="text-purple-400">async function <span className="text-yellow-200">main</span>() {'{'}</p>
          <p className="pl-4 text-gray-500">// Initialize system</p>
          <p className="pl-4 text-white/50">const server = new Server();</p>
          <br/>
          <p className="pl-4 text-gray-500">// TODO: Implement fix</p>
          <div className="pl-4 text-white">
             {activeText && <span className="text-emerald-300 bg-emerald-900/30 px-1">{activeText}</span>}
          </div>
          <p>{'}'}</p>
        </div>
      </div>

      {/* AI App */}
      <div className="relative glass rounded-xl flex flex-col overflow-hidden col-span-1 row-span-1 shadow-2xl">
        <div className="h-10 bg-white/10 flex items-center px-4 gap-2 border-b border-white/10">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-sm text-white/70 font-medium">Antigravity AI Canvas</span>
        </div>
        <div className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center">
            <Sparkles className="w-12 h-12 text-purple-400/50 mx-auto mb-4" />
            <p className="text-white/50 text-sm">Hold <kbd className="px-2 py-1 bg-white/10 rounded-md text-white/80 mx-1 border border-white/20">Alt</kbd> anywhere to dictate.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
