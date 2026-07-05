// 3D Visual Credit Splash Screen (Global Page Entry)
(function() {
    // Inject Custom Keyframe Animations
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes spin-slow { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes spin-reverse { 0% { transform: rotate(360deg); } 100% { transform: rotate(0deg); } }
        @keyframes pulse-glow { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.05); } }
        @keyframes scale-up { 0% { transform: scale(0.92); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes progress-grow { 0% { width: 0%; } 100% { width: 100%; } }
    `;
    document.head.appendChild(style);

    // Inject Splash Screen Overlay
    const splash = document.createElement('div');
    splash.id = 'intro-splash-global';
    splash.style.cssText = "position: fixed; inset: 0; z-index: 9999999; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: #05070a; overflow: hidden; font-family: 'Inter', sans-serif; transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);";
    splash.innerHTML = `
        <!-- Giant glowing nebula backdrop -->
        <div style="position: absolute; inset: 0; background: radial-gradient(circle at center, rgba(102, 253, 172, 0.12) 0%, transparent 60%); animation: pulse-glow 4s ease-in-out infinite;"></div>
        
        <!-- 3D Crystalline Spinning Elements -->
        <div style="position: relative; width: 200px; height: 200px; margin-bottom: 24px; display: flex; align-items: center; justify-content: center; animation: scale-up 1s ease-out;">
            <!-- Outer Orb Orbit -->
            <div style="position: absolute; width: 180px; height: 180px; border: 2px solid rgba(102, 253, 172, 0.25); border-radius: 50%; animation: spin-slow 8s linear infinite; box-shadow: 0 0 40px rgba(102, 253, 172, 0.15);"></div>
            <!-- Inner Orbit -->
            <div style="position: absolute; width: 140px; height: 140px; border: 1px dashed rgba(173, 198, 255, 0.4); border-radius: 50%; animation: spin-reverse 12s linear infinite;"></div>
            <!-- Central Crystalline Core -->
            <div style="width: 70px; height: 70px; background: linear-gradient(135deg, #66fdac 0%, #adc6ff 100%); transform: rotate(45deg); border-radius: 16px; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 50px rgba(102, 253, 172, 0.6); border: 2px solid rgba(255, 255, 255, 0.2);">
                <span class="material-symbols-outlined" style="font-size: 32px; color: #05070a; transform: rotate(-45deg); font-weight: 900; animation: pulse-glow 2s infinite;">auto_awesome</span>
            </div>
        </div>
        
        <!-- Typography -->
        <div style="text-align: center; z-index: 10; animation: scale-up 1.2s ease-out;">
            <h2 style="font-size: 10px; letter-spacing: 0.35em; color: #adc6ff; font-weight: 700; margin-bottom: 8px; text-transform: uppercase;">INITIALIZING TRADEX SYSTEM</h2>
            <h1 style="font-size: 24px; font-weight: 900; color: #ffffff; letter-spacing: 0.05em; line-height: 1.3;">
                MADE BY <span style="background: linear-gradient(to right, #66fdac, #adc6ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0 0 10px rgba(102,253,172,0.4)); font-weight: 900;">ABHISHEK RULANIYA</span>
            </h1>
            <p style="font-size: 11px; letter-spacing: 0.2em; color: #8f9194; margin-top: 6px; font-weight: 600;">IN 3D &amp; BEST VISUALS POSSIBLE</p>
        </div>
        
        <!-- Progress loader -->
        <div style="position: relative; width: 180px; height: 3px; background-color: rgba(255, 255, 255, 0.05); border-radius: 9px; margin-top: 32px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.05);">
            <div style="height: 100%; background: linear-gradient(90deg, #adc6ff, #66fdac, #adc6ff); border-radius: 9px; animation: progress-grow 3.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;"></div>
        </div>
    `;
    
    // Inject safely when document body exists
    if (document.body) {
        document.body.appendChild(splash);
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            document.body.appendChild(splash);
        });
    }

    // Fade out timeout
    setTimeout(() => {
        const splashEl = document.getElementById('intro-splash-global');
        if (splashEl) {
            splashEl.style.opacity = '0';
            splashEl.style.transform = 'scale(1.05)';
            splashEl.style.pointerEvents = 'none';
            setTimeout(() => splashEl.remove(), 800);
        }
    }, 3800); // 3.8 seconds
})();

// Reusable Sidebar Modals Controller
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Modals HTML into body
    const modalsHTML = `
    <!-- Indices Modal -->
    <div id="modal-indices" class="fixed inset-0 z-50 hidden flex items-center justify-center bg-black/85 backdrop-blur-md">
        <div class="glass-panel w-full max-w-xl p-6 rounded-2xl border border-white/10 shadow-2xl relative bg-[#0e1217]/95">
            <button onclick="closeSidebarModal('indices')" class="absolute top-4 right-4 text-on-surface-variant hover:text-white transition-colors">&times;</button>
            <h3 class="text-xl font-black text-white mb-6 font-display-lg flex items-center gap-2">
                <span class="material-symbols-outlined text-secondary">language</span> GLOBAL INDICES MATRIX
            </h3>
            <div class="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                <div class="grid grid-cols-3 p-3 bg-white/5 rounded border border-white/5 items-center">
                    <div class="font-bold text-white">NIFTY 50</div>
                    <div class="text-right font-data-tabular text-tertiary font-bold">22,450.20 (+1.2%)</div>
                    <div class="text-right text-[11px] text-on-surface-variant">NSE India</div>
                </div>
                <div class="grid grid-cols-3 p-3 bg-white/5 rounded border border-white/5 items-center">
                    <div class="font-bold text-white">SENSEX</div>
                    <div class="text-right font-data-tabular text-tertiary font-bold">74,120.45 (+0.8%)</div>
                    <div class="text-right text-[11px] text-on-surface-variant">BSE India</div>
                </div>
                <div class="grid grid-cols-3 p-3 bg-white/5 rounded border border-white/5 items-center">
                    <div class="font-bold text-white">INDIA VIX</div>
                    <div class="text-right font-data-tabular text-error font-bold">12.42 (-2.1%)</div>
                    <div class="text-right text-[11px] text-on-surface-variant">Volatility Index</div>
                </div>
                <div class="grid grid-cols-3 p-3 bg-white/5 rounded border border-white/5 items-center">
                    <div class="font-bold text-white">NIFTY BANK</div>
                    <div class="text-right font-data-tabular text-tertiary font-bold">47,840.15 (+1.45%)</div>
                    <div class="text-right text-[11px] text-on-surface-variant">NSE Banking</div>
                </div>
                <div class="grid grid-cols-3 p-3 bg-white/5 rounded border border-white/5 items-center">
                    <div class="font-bold text-white">NIFTY IT</div>
                    <div class="text-right font-data-tabular text-error font-bold">36,120.40 (-0.35%)</div>
                    <div class="text-right text-[11px] text-on-surface-variant">NSE IT Sector</div>
                </div>
            </div>
            <button onclick="closeSidebarModal('indices')" class="w-full mt-6 bg-secondary text-on-secondary-fixed py-2.5 rounded-lg text-[11px] font-label-caps active:scale-95 transition-all">CLOSE</button>
        </div>
    </div>

    <!-- Alerts Modal -->
    <div id="modal-alerts" class="fixed inset-0 z-50 hidden flex items-center justify-center bg-black/85 backdrop-blur-md">
        <div class="glass-panel w-full max-w-md p-6 rounded-2xl border border-white/10 shadow-2xl relative bg-[#0e1217]/95">
            <button onclick="closeSidebarModal('alerts')" class="absolute top-4 right-4 text-on-surface-variant hover:text-white transition-colors">&times;</button>
            <h3 class="text-xl font-black text-white mb-6 font-display-lg flex items-center gap-2">
                <span class="material-symbols-outlined text-secondary">notifications_active</span> PRICE ALERTS MANAGER
            </h3>
            <div class="space-y-4">
                <div class="space-y-2">
                    <label class="block text-[10px] font-label-caps text-outline uppercase">Active Alerts</label>
                    <div class="space-y-2" id="alerts-list">
                        <div class="flex justify-between items-center p-2.5 bg-white/5 rounded border border-white/5 text-xs">
                            <span class="font-bold text-white">RELIANCE &gt; ₹3,000.00</span>
                            <button onclick="this.parentElement.remove()" class="text-error hover:underline font-label-caps">DELETE</button>
                        </div>
                        <div class="flex justify-between items-center p-2.5 bg-white/5 rounded border border-white/5 text-xs">
                            <span class="font-bold text-white">HDFCBANK &lt; ₹1,400.00</span>
                            <button onclick="this.parentElement.remove()" class="text-error hover:underline font-label-caps">DELETE</button>
                        </div>
                    </div>
                </div>
                <form onsubmit="addNewAlert(event)" class="space-y-3 pt-3 border-t border-outline-variant/30">
                    <label class="block text-[10px] font-label-caps text-outline uppercase">Create New Alert</label>
                    <div class="grid grid-cols-2 gap-2">
                        <input id="alert-sym" type="text" placeholder="Symbol" required class="bg-black/40 border border-outline-variant rounded p-2 text-white font-data-tabular uppercase text-xs focus:outline-none focus:border-secondary"/>
                        <select id="alert-cond" class="bg-black/40 border border-outline-variant rounded p-2 text-white font-label-caps text-xs focus:outline-none focus:border-secondary">
                            <option value=">">GREATER THAN (&gt;)</option>
                            <option value="<">LESS THAN (&lt;)</option>
                        </select>
                    </div>
                    <input id="alert-val" type="number" placeholder="Target Price (₹)" required class="w-full bg-black/40 border border-outline-variant rounded p-2 text-white font-data-tabular text-xs focus:outline-none focus:border-secondary"/>
                    <button type="submit" class="w-full bg-secondary text-on-secondary-fixed py-2 rounded text-[11px] font-label-caps active:scale-95 transition-all">ADD ALERT</button>
                </form>
            </div>
        </div>
    </div>

    <!-- Settings Modal -->
    <div id="modal-settings" class="fixed inset-0 z-50 hidden flex items-center justify-center bg-black/85 backdrop-blur-md">
        <div class="glass-panel w-full max-w-md p-6 rounded-2xl border border-white/10 shadow-2xl relative bg-[#0e1217]/95">
            <button onclick="closeSidebarModal('settings')" class="absolute top-4 right-4 text-on-surface-variant hover:text-white transition-colors">&times;</button>
            <h3 class="text-xl font-black text-white mb-6 font-display-lg flex items-center gap-2">
                <span class="material-symbols-outlined text-secondary">settings</span> SYSTEM CONFIGURATION
            </h3>
            <div class="space-y-4">
                <div class="space-y-2">
                    <label class="block text-[10px] font-label-caps text-outline uppercase">Theme Highlight Palette</label>
                    <div class="grid grid-cols-3 gap-2">
                        <button onclick="changeThemePalette('emerald')" class="py-2 rounded border border-tertiary bg-tertiary/10 text-tertiary font-label-caps text-[10px] active:scale-95 transition-all">EMERALD</button>
                        <button onclick="changeThemePalette('azure')" class="py-2 rounded border border-outline-variant bg-white/5 text-outline hover:border-secondary hover:text-secondary font-label-caps text-[10px] active:scale-95 transition-all">AZURE</button>
                        <button onclick="changeThemePalette('coral')" class="py-2 rounded border border-outline-variant bg-white/5 text-outline hover:border-orange-400 hover:text-orange-400 font-label-caps text-[10px] active:scale-95 transition-all">CORAL</button>
                    </div>
                </div>
                <div class="space-y-2">
                    <label class="block text-[10px] font-label-caps text-outline uppercase">Data Streaming Mode</label>
                    <div class="flex justify-between items-center p-2.5 bg-white/5 rounded border border-white/5 text-xs">
                        <span class="text-white">Mock Tick Engine</span>
                        <span class="text-tertiary font-bold font-label-caps">ACTIVE</span>
                    </div>
                </div>
                <div class="space-y-2">
                    <label class="block text-[10px] font-label-caps text-outline uppercase">Layout Density</label>
                    <div class="flex justify-between items-center p-2.5 bg-white/5 rounded border border-white/5 text-xs">
                        <span class="text-white">High Density Mode</span>
                        <span class="text-secondary font-bold font-label-caps">DEFAULT</span>
                    </div>
                </div>
            </div>
            <button onclick="closeSidebarModal('settings')" class="w-full mt-6 bg-secondary text-on-secondary-fixed py-2.5 rounded-lg text-[11px] font-label-caps active:scale-95 transition-all">SAVE CONFIGURATION</button>
        </div>
    </div>

    <!-- Support Modal -->
    <div id="modal-support" class="fixed inset-0 z-50 hidden flex items-center justify-center bg-black/85 backdrop-blur-md">
        <div class="glass-panel w-full max-w-md p-6 rounded-2xl border border-white/10 shadow-2xl relative bg-[#0e1217]/95">
            <button onclick="closeSidebarModal('support')" class="absolute top-4 right-4 text-on-surface-variant hover:text-white transition-colors">&times;</button>
            <h3 class="text-xl font-black text-white mb-4 font-display-lg flex items-center gap-2">
                <span class="material-symbols-outlined text-secondary">help</span> HELP &amp; SUPPORT
            </h3>
            <div class="space-y-4 text-xs text-on-surface-variant leading-relaxed">
                <div>
                    <h4 class="font-bold text-white mb-1">Interactive Candlestick Charts</h4>
                    <p>Click and drag your mouse left or right on the chart canvas to scroll back in time to view previous candlesticks. Hover over the chart area to display the technical crosshairs and floating OHLC metrics.</p>
                </div>
                <div>
                    <h4 class="font-bold text-white mb-1">Performance Trade Journal</h4>
                    <p>Click "New Trade" to open the logs form. Inputting values will instantly recalculate your cumulative P&L growth SVG curve, daily calendar heatmaps, win rates, and profit factors.</p>
                </div>
                <div>
                    <h4 class="font-bold text-white mb-1">Greeks Options Chain</h4>
                    <p>Toggle the Calls/Puts selector to filter contracts. Clicking "TRADE" next to any strike price executes a transaction order and flashes a success toast receipt.</p>
                </div>
                <div class="pt-2 border-t border-outline-variant/30 text-[10px] font-label-caps space-y-1">
                    <div>VERSION: v2.4.1-Stable</div>
                    <div>CONTACT: support@tradex.terminal</div>
                </div>
            </div>
            <button onclick="closeSidebarModal('support')" class="w-full mt-6 bg-secondary text-on-secondary-fixed py-2.5 rounded-lg text-[11px] font-label-caps active:scale-95 transition-all">DONE</button>
        </div>
    </div>
    `;

    const div = document.createElement('div');
    div.innerHTML = modalsHTML;
    document.body.appendChild(div);

    // 2. Hijack Sidebar Click Events
    const spans = Array.from(document.querySelectorAll('span'));
    spans.forEach(span => {
        const txt = span.textContent.trim().toLowerCase();
        if (['indices', 'alerts', 'settings', 'support'].includes(txt)) {
            // Find parent div that acts as the navigation link
            const parentDiv = span.closest('div');
            if (parentDiv) {
                parentDiv.removeAttribute('onclick');
                parentDiv.style.cursor = 'pointer';
                parentDiv.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openSidebarModal(txt);
                };
            }
        }
    });
});

// Modal toggle functions
function openSidebarModal(modalName) {
    const modal = document.getElementById(`modal-${modalName}`);
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function closeSidebarModal(modalName) {
    const modal = document.getElementById(`modal-${modalName}`);
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Alert management
function addNewAlert(e) {
    e.preventDefault();
    const sym = document.getElementById('alert-sym').value.toUpperCase();
    const cond = document.getElementById('alert-cond').value;
    const val = parseFloat(document.getElementById('alert-val').value).toFixed(2);
    
    const list = document.getElementById('alerts-list');
    if(list) {
        const item = document.createElement('div');
        item.className = 'flex justify-between items-center p-2.5 bg-white/5 rounded border border-white/5 text-xs';
        item.innerHTML = `
            <span class="font-bold text-white">${sym} ${cond} ₹${val}</span>
            <button onclick="this.parentElement.remove()" class="text-error hover:underline font-label-caps">DELETE</button>
        `;
        list.appendChild(item);
    }
    
    // Reset form
    document.getElementById('alert-sym').value = '';
    document.getElementById('alert-val').value = '';
}

// Color palette switcher logic
function changeThemePalette(color) {
    // Optional aesthetic feedback
    console.log(`Changed theme highlight color to: ${color}`);
}

// Build Trigger: 1783294256.7562346
