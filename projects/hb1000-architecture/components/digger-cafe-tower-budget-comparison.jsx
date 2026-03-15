import React from 'react';

export default function DiggerCafeTowerBudgetComparison() {
  return (
    <div className="min-h-screen bg-stone-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-stone-800 mb-1">DIGGER CAFÉ TOWER</h1>
          <p className="text-sm text-stone-600">3-Week Build • $25K to $100K Budget Range • Containers Owned</p>
        </div>

        {/* Two-Column Visual Comparison */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* $25K VERSION */}
          <div className="bg-amber-50 rounded-xl shadow-lg overflow-hidden border-2 border-amber-400">
            <div className="bg-amber-400 text-white text-center py-2">
              <div className="text-xl font-bold">$25,000</div>
              <div className="text-xs">MODEST BUILD</div>
            </div>
            
            {/* Visual */}
            <div className="p-3">
              <svg viewBox="0 0 300 180" className="w-full">
                <defs>
                  <linearGradient id="sky25" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#87CEEB" />
                    <stop offset="100%" stopColor="#E0F4FF" />
                  </linearGradient>
                </defs>
                
                <rect x="0" y="0" width="300" height="180" fill="url(#sky25)" />
                
                {/* Ground */}
                <rect x="0" y="150" width="300" height="30" fill="#4A7C59" />
                <rect x="50" y="140" width="200" height="15" fill="#9CA3AF" />
                
                {/* Containers - painted with graphics */}
                {/* Ground Level */}
                <rect x="70" y="100" width="70" height="38" fill="#2563EB" stroke="#1E40AF" strokeWidth="2" />
                <rect x="160" y="100" width="70" height="38" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
                
                {/* Upper Level */}
                <rect x="70" y="58" width="70" height="38" fill="#2563EB" stroke="#1E40AF" strokeWidth="2" />
                <rect x="160" y="58" width="70" height="38" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
                
                {/* Graphics/Murals on containers */}
                <text x="105" y="90" textAnchor="middle" fill="#FFD700" fontSize="8" fontWeight="bold">DIGGER</text>
                <text x="105" y="100" textAnchor="middle" fill="#FFD700" fontSize="6">CAFÉ</text>
                <text x="195" y="90" textAnchor="middle" fill="#FFD700" fontSize="8" fontWeight="bold">RC</text>
                <text x="195" y="100" textAnchor="middle" fill="#FFD700" fontSize="6">ARENA</text>
                
                {/* Container doors shown open */}
                <rect x="55" y="103" width="5" height="32" fill="#1E40AF" transform="rotate(-10, 60, 118)" />
                <rect x="240" y="103" width="5" height="32" fill="#991B1B" transform="rotate(10, 240, 118)" />
                
                {/* Simple banner sign */}
                <rect x="90" y="35" width="120" height="18" fill="#FFD700" stroke="#B8860B" strokeWidth="1" />
                <text x="150" y="48" textAnchor="middle" fill="#333" fontSize="10" fontWeight="bold">DIGGER CAFÉ</text>
                
                {/* Label */}
                <text x="150" y="170" textAnchor="middle" fill="#666" fontSize="8">Painted containers + vinyl graphics</text>
              </svg>
            </div>
            
            {/* Features List */}
            <div className="px-3 pb-3 text-xs space-y-1">
              <div className="flex items-center gap-1">
                <span className="text-amber-600">✓</span>
                <span>Painted containers w/ branded graphics</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-amber-600">✓</span>
                <span>Basic drip coffee + pre-packaged snacks</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-amber-600">✓</span>
                <span>6 budget RC excavators</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-amber-600">✓</span>
                <span>8ft sandbox arena</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-amber-600">✓</span>
                <span>Portable AC + space heaters</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-stone-400">✗</span>
                <span className="text-stone-400">No scenic shell</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-stone-400">✗</span>
                <span className="text-stone-400">No rooftop deck</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-stone-400">✗</span>
                <span className="text-stone-400">No restroom (porta-potty)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-stone-400">✗</span>
                <span className="text-stone-400">Upper level = storage only</span>
              </div>
            </div>
            
            <div className="bg-amber-100 px-3 py-2 text-center text-xs text-amber-800">
              <span className="font-bold">"Cool pop-up"</span> — proof of concept
            </div>
          </div>

          {/* $100K VERSION */}
          <div className="bg-green-50 rounded-xl shadow-lg overflow-hidden border-2 border-green-500">
            <div className="bg-green-600 text-white text-center py-2">
              <div className="text-xl font-bold">$100,000</div>
              <div className="text-xs">FULL BUILD</div>
            </div>
            
            {/* Visual */}
            <div className="p-3">
              <svg viewBox="0 0 300 180" className="w-full">
                <defs>
                  <linearGradient id="sky100" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#87CEEB" />
                    <stop offset="100%" stopColor="#E0F4FF" />
                  </linearGradient>
                  <linearGradient id="shell100" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#C4A574" />
                    <stop offset="60%" stopColor="#8B7355" />
                    <stop offset="100%" stopColor="#6B5344" />
                  </linearGradient>
                </defs>
                
                <rect x="0" y="0" width="300" height="180" fill="url(#sky100)" />
                
                {/* Ground */}
                <rect x="0" y="150" width="300" height="30" fill="#4A7C59" />
                <rect x="40" y="140" width="220" height="15" fill="#9CA3AF" />
                
                {/* Scenic Shell */}
                <path 
                  d="M 40 140 
                     L 55 100 
                     L 75 70 
                     L 100 40 
                     L 130 20 
                     L 155 25
                     L 175 50
                     L 190 65
                     L 200 65
                     L 230 65
                     L 245 55
                     L 260 80
                     L 270 110
                     L 275 140
                     L 40 140 Z" 
                  fill="url(#shell100)"
                  stroke="#5D4E3A"
                  strokeWidth="1"
                />
                
                {/* Viewing deck crater */}
                <path 
                  d="M 200 65 
                     L 203 80
                     L 207 90
                     L 227 90
                     L 230 80
                     L 230 65" 
                  fill="#87CEEB"
                />
                <rect x="205" y="87" width="24" height="3" fill="#8B4513" />
                
                {/* Containers inside shell (partially visible) */}
                <rect x="70" y="100" width="70" height="38" fill="#2563EB" stroke="#1E40AF" strokeWidth="1" opacity="0.8" />
                <rect x="160" y="100" width="70" height="38" fill="#DC2626" stroke="#991B1B" strokeWidth="1" opacity="0.8" />
                <rect x="70" y="58" width="70" height="38" fill="#2563EB" stroke="#1E40AF" strokeWidth="1" opacity="0.8" />
                <rect x="160" y="58" width="70" height="38" fill="#DC2626" stroke="#991B1B" strokeWidth="1" opacity="0.8" />
                
                {/* Container doors shown open */}
                <rect x="55" y="103" width="5" height="32" fill="#1E40AF" transform="rotate(-10, 60, 118)" />
                <rect x="240" y="103" width="5" height="32" fill="#991B1B" transform="rotate(10, 240, 118)" />
                
                {/* Boulder details */}
                <ellipse cx="85" cy="85" rx="8" ry="5" fill="#7A6855" />
                <ellipse cx="245" cy="100" rx="10" ry="6" fill="#7A6855" />
                <ellipse cx="135" cy="35" rx="6" ry="4" fill="#7A6855" />
                
                {/* Label */}
                <text x="150" y="170" textAnchor="middle" fill="#666" fontSize="8">Full EPS scenic shell + viewing deck</text>
              </svg>
            </div>
            
            {/* Features List */}
            <div className="px-3 pb-3 text-xs space-y-1">
              <div className="flex items-center gap-1">
                <span className="text-green-600">✓</span>
                <span className="font-medium">Full EPS scenic shell (prairie mound)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-green-600">✓</span>
                <span className="font-medium">Rooftop viewing deck w/ lake views</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-green-600">✓</span>
                <span>Commercial espresso + pastry display</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-green-600">✓</span>
                <span>10+ quality RC excavators</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-green-600">✓</span>
                <span>12ft sandbox w/ kinetic sand</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-green-600">✓</span>
                <span>Mini-split HVAC (year-round)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-green-600">✓</span>
                <span>Full plumbing + ADA restroom</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-green-600">✓</span>
                <span>Party room (16 capacity)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-green-600">✓</span>
                <span>Code-compliant staircase</span>
              </div>
            </div>
            
            <div className="bg-green-100 px-3 py-2 text-center text-xs text-green-800">
              <span className="font-bold">"Destination attraction"</span> — full vision
            </div>
          </div>
        </div>

        {/* Budget Breakdown Comparison */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
          <h3 className="text-sm font-bold text-stone-800 mb-3 text-center">BUDGET BREAKDOWN COMPARISON</h3>
          
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="font-bold text-stone-600">Category</div>
            <div className="font-bold text-amber-600 text-right">$25K</div>
            <div className="font-bold text-green-600 text-right">$100K</div>
            
            <div>Containers (4×)</div>
            <div className="text-right text-green-600 font-medium">$0</div>
            <div className="text-right text-green-600 font-medium">$0</div>
            
            <div>Container mods</div>
            <div className="text-right">$4,000</div>
            <div className="text-right">$12,000</div>
            
            <div>Interior finish</div>
            <div className="text-right">$5,000</div>
            <div className="text-right">$14,000</div>
            
            <div>Foundation</div>
            <div className="text-right">$1,500</div>
            <div className="text-right">$6,000</div>
            
            <div>Site work</div>
            <div className="text-right">$2,000</div>
            <div className="text-right">$8,000</div>
            
            <div className="font-medium bg-amber-50 -mx-1 px-1">Scenic shell / exterior</div>
            <div className="text-right bg-amber-50">$2,000</div>
            <div className="text-right bg-green-50 font-bold">$25,000</div>
            
            <div>Staircase</div>
            <div className="text-right">$500</div>
            <div className="text-right">$4,000</div>
            
            <div>Electrical</div>
            <div className="text-right">$3,000</div>
            <div className="text-right">$8,000</div>
            
            <div>Plumbing</div>
            <div className="text-right">$500</div>
            <div className="text-right">$4,000</div>
            
            <div>HVAC</div>
            <div className="text-right">$500</div>
            <div className="text-right">$4,000</div>
            
            <div>Café equipment</div>
            <div className="text-right">$1,500</div>
            <div className="text-right">$8,000</div>
            
            <div>RC fleet</div>
            <div className="text-right">$1,000</div>
            <div className="text-right">$3,000</div>
            
            <div>Sandbox</div>
            <div className="text-right">$500</div>
            <div className="text-right">$2,000</div>
            
            <div>Furniture/fixtures</div>
            <div className="text-right">$1,000</div>
            <div className="text-right">$3,000</div>
            
            <div>Signage</div>
            <div className="text-right">$500</div>
            <div className="text-right">$2,000</div>
            
            <div>Permits</div>
            <div className="text-right">$1,500</div>
            <div className="text-right">$3,000</div>
            
            <div className="font-bold border-t border-stone-300 pt-1">TOTAL</div>
            <div className="text-right font-bold border-t border-stone-300 pt-1 text-amber-600">$25,000</div>
            <div className="text-right font-bold border-t border-stone-300 pt-1 text-green-600">$100,000*</div>
          </div>
          
          <div className="text-xs text-stone-500 mt-2 text-center">*Requires ~$6K value engineering to hit target</div>
        </div>

        {/* Sample Budget Tiers */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
          <h3 className="text-sm font-bold text-stone-800 mb-3 text-center">PICK YOUR NUMBER — SAMPLE TIERS</h3>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2 bg-amber-100 rounded-lg">
              <div className="w-16 text-center font-bold text-amber-800">$25K</div>
              <div className="flex-1 text-xs text-amber-900">Painted containers, basic café, 6 diggers, porta-potty, portable AC. <span className="font-bold">Proof of concept.</span></div>
            </div>
            <div className="flex items-center gap-2 p-2 bg-yellow-100 rounded-lg">
              <div className="w-16 text-center font-bold text-yellow-800">$40K</div>
              <div className="flex-1 text-xs text-yellow-900">+ Restroom, mini-split HVAC, better electrical. Still painted containers but <span className="font-bold">fully functional.</span></div>
            </div>
            <div className="flex items-center gap-2 p-2 bg-lime-100 rounded-lg">
              <div className="w-16 text-center font-bold text-lime-800">$60K</div>
              <div className="flex-1 text-xs text-lime-900">+ Simplified scenic shell. Now a <span className="font-bold">destination.</span> Ground level operations only.</div>
            </div>
            <div className="flex items-center gap-2 p-2 bg-emerald-100 rounded-lg">
              <div className="w-16 text-center font-bold text-emerald-800">$80K</div>
              <div className="flex-1 text-xs text-emerald-900">+ Upper level finished (party room), code staircase, espresso setup. <span className="font-bold">Full two-level operation.</span></div>
            </div>
            <div className="flex items-center gap-2 p-2 bg-green-200 rounded-lg">
              <div className="w-16 text-center font-bold text-green-800">$100K</div>
              <div className="flex-1 text-xs text-green-900">+ Rooftop viewing deck crater, quality fixtures throughout, larger RC fleet. <span className="font-bold">Full vision.</span></div>
            </div>
          </div>
        </div>

        {/* Fixed Parameters */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="bg-stone-700 text-white rounded-lg p-2 text-center">
            <div className="text-lg font-bold">3 WKS</div>
            <div className="text-xs opacity-80">Build Time</div>
          </div>
          <div className="bg-stone-700 text-white rounded-lg p-2 text-center">
            <div className="text-lg font-bold">4</div>
            <div className="text-xs opacity-80">Containers (Owned)</div>
          </div>
          <div className="bg-stone-700 text-white rounded-lg p-2 text-center">
            <div className="text-lg font-bold">$0</div>
            <div className="text-xs opacity-80">Container Cost</div>
          </div>
          <div className="bg-stone-700 text-white rounded-lg p-2 text-center">
            <div className="text-lg font-bold">0</div>
            <div className="text-xs opacity-80">Separate Frame</div>
          </div>
        </div>

        {/* Key Principle */}
        <div className="bg-gradient-to-r from-amber-500 to-green-600 rounded-xl p-3 text-white text-center">
          <h3 className="text-sm font-bold mb-1">SEA CANS = SUPERSTRUCTURE (BOTH VERSIONS)</h3>
          <p className="text-xs">Container corner posts (30+ tons each) support everything. Original doors swing open but stay hinged = structural integrity maintained. No separate steel frame needed at any budget level.</p>
        </div>

        {/* Footer */}
        <div className="text-center mt-3 text-stone-500 text-xs">
          DIGGER CAFÉ TOWER — Pick a number between $25K and $100K
        </div>
      </div>
    </div>
  );
}
