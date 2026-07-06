// 3D Shiny Sky Blue Watermark (Top Left)
(function() {
    const watermark = document.createElement('div');
    watermark.style.cssText = "position: fixed; top: 12px; left: 24px; z-index: 999998; font-family: 'Roboto Mono', monospace; font-size: 8px; font-weight: 800; color: #80d8ff; letter-spacing: 0.15em; text-transform: uppercase; pointer-events: none; opacity: 0.9; text-shadow: 1px 1px 0px #0056b3, 2px 2px 0px #002b5c, 0 0 8px rgba(128, 216, 255, 0.7); display: flex; align-items: center; gap: 5px;";
    watermark.innerHTML = `
        <span style="width: 5px; height: 5px; border-radius: 50%; background-color: #80d8ff; box-shadow: 0 0 6px #80d8ff; display: inline-block;"></span>
        MADE BY ABHISHEK RULANIYA
    `;
    
    if (document.body) {
        document.body.appendChild(watermark);
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            document.body.appendChild(watermark);
        });
    }
})();



// Mobile Sidebar Toggle
function toggleMobileSidebar() {
    const sidebar = document.getElementById('main-sidebar');
    const overlay = document.getElementById('mobile-sidebar-overlay');
    if (sidebar && overlay) {
        if (sidebar.classList.contains('-translate-x-full')) {
            sidebar.classList.remove('-translate-x-full');
            overlay.classList.remove('hidden');
        } else {
            sidebar.classList.add('-translate-x-full');
            overlay.classList.add('hidden');
        }
    }
}

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

// Build Trigger: FORCE_SPLASH_MOBILE_FIX 1783294256.7562346
