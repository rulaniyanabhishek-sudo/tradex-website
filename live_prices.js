/**
 * TRADEX Live Market Data Module
 * Fetches REAL live stock prices from Yahoo Finance via CORS proxy.
 * Works on static GitHub Pages with no backend needed.
 */

(function () {
    'use strict';

    // ─── Symbol Mappings (Display Name → Yahoo Finance Symbol) ───
    const SYMBOL_MAP = {
        'RELIANCE':      'RELIANCE.NS',
        'TCS':           'TCS.NS',
        'HDFC BANK':     'HDFCBANK.NS',
        'INFY':          'INFY.NS',
        'ICICI BANK':    'ICICIBANK.NS',
        'SBIN':          'SBIN.NS',
        'L&T':           'LT.NS',
        'BHARTI AIRTEL': 'BHARTIARTL.NS',
        'ITC':           'ITC.NS',
        'KOTAK BANK':    'KOTAKBANK.NS',
        'AXIS BANK':     'AXISBANK.NS',
        'TATA MOTORS':   'TATAMOTORS.NS',
        'HUL':           'HINDUNILVR.NS',
        'BAJAJ FINANCE': 'BAJFINANCE.NS',
        'MARUTI':        'MARUTI.NS',
        'SUN PHARMA':    'SUNPHARMA.NS',
        'TITAN':         'TITAN.NS',
        'TATA STEEL':    'TATASTEEL.NS',
        'M&M':           'M&M.NS',
        'NTPC':          'NTPC.NS'
    };

    const INDEX_MAP = {
        'NIFTY':  '^NSEI',
        'SENSEX': '^BSESN',
        'VIX':    '^INDIAVIX'
    };

    // ─── CORS Proxy List (try in order) ───
    const CORS_PROXIES = [
        'https://corsproxy.io/?url=',
        'https://api.allorigins.win/raw?url=',
        'https://api.codetabs.com/v1/proxy?quest='
    ];

    // ─── Global Live Price Cache ───
    window._tradexLivePrices = window._tradexLivePrices || {};
    window._tradexIndexPrices = window._tradexIndexPrices || {};

    // ─── Fetch a single symbol from Yahoo Finance ───
    async function fetchYahooQuote(yahooSymbol) {
        const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(yahooSymbol)}?interval=1d&range=1d`;

        for (const proxy of CORS_PROXIES) {
            try {
                const resp = await fetch(proxy + encodeURIComponent(url), {
                    signal: AbortSignal.timeout(8000)
                });
                if (!resp.ok) continue;
                const data = await resp.json();
                const meta = data?.chart?.result?.[0]?.meta;
                if (!meta) continue;

                return {
                    price: meta.regularMarketPrice,
                    previousClose: meta.chartPreviousClose || meta.previousClose,
                    dayHigh: meta.regularMarketDayHigh || meta.regularMarketPrice * 1.01,
                    dayLow: meta.regularMarketDayLow || meta.regularMarketPrice * 0.99,
                    volume: meta.regularMarketVolume || 0
                };
            } catch (e) {
                // Try next proxy
                continue;
            }
        }
        return null; // All proxies failed
    }

    // ─── Format volume to human readable ───
    function formatVolume(vol) {
        if (!vol) return '0';
        if (vol >= 1e7) return (vol / 1e7).toFixed(2) + 'Cr';
        if (vol >= 1e5) return (vol / 1e5).toFixed(2) + 'L';
        if (vol >= 1e3) return (vol / 1e3).toFixed(1) + 'K';
        return vol.toString();
    }

    // ─── Fetch ALL stock prices in parallel ───
    async function fetchAllStockPrices() {
        console.log('[TRADEX LIVE] Fetching live market data...');

        // Fetch indices
        const indexPromises = Object.entries(INDEX_MAP).map(async ([name, yahoo]) => {
            const data = await fetchYahooQuote(yahoo);
            if (data) {
                window._tradexIndexPrices[name] = data;
            }
        });

        // Fetch stocks
        const stockPromises = Object.entries(SYMBOL_MAP).map(async ([displayName, yahoo]) => {
            const data = await fetchYahooQuote(yahoo);
            if (data) {
                window._tradexLivePrices[displayName] = data;
            }
        });

        await Promise.allSettled([...indexPromises, ...stockPromises]);
        console.log('[TRADEX LIVE] Fetched prices for', Object.keys(window._tradexLivePrices).length, 'stocks and', Object.keys(window._tradexIndexPrices).length, 'indices');
        
        // Save to sessionStorage so we don't refetch on page navigation
        try {
            sessionStorage.setItem('tradex_live_stocks', JSON.stringify(window._tradexLivePrices));
            sessionStorage.setItem('tradex_live_indices', JSON.stringify(window._tradexIndexPrices));
            sessionStorage.setItem('tradex_live_timestamp', Date.now().toString());
        } catch(e) {}
    }

    // ─── Load cached data from sessionStorage ───
    function loadCachedPrices() {
        try {
            const ts = parseInt(sessionStorage.getItem('tradex_live_timestamp') || '0');
            // Use cache if less than 2 minutes old
            if (Date.now() - ts < 120000) {
                const stocks = JSON.parse(sessionStorage.getItem('tradex_live_stocks') || '{}');
                const indices = JSON.parse(sessionStorage.getItem('tradex_live_indices') || '{}');
                if (Object.keys(stocks).length > 0) {
                    window._tradexLivePrices = stocks;
                    window._tradexIndexPrices = indices;
                    console.log('[TRADEX LIVE] Loaded cached prices');
                    return true;
                }
            }
        } catch(e) {}
        return false;
    }

    // ─── Update the top ticker bar with live index data ───
    function updateTickerBar() {
        const nifty = window._tradexIndexPrices['NIFTY'];
        const sensex = window._tradexIndexPrices['SENSEX'];
        const vix = window._tradexIndexPrices['VIX'];

        if (!nifty && !sensex) return;

        // Find ticker element (works across all pages)
        const tickerEls = document.querySelectorAll('.font-label-caps.text-label-caps.text-on-surface');
        tickerEls.forEach(el => {
            if (el.textContent.includes('NIFTY') || el.textContent.includes('SENSEX')) {
                const parts = [];
                if (nifty) {
                    const nChange = nifty.price - nifty.previousClose;
                    const nPct = ((nChange / nifty.previousClose) * 100).toFixed(2);
                    const nSign = nChange >= 0 ? '+' : '';
                    parts.push(`NIFTY: ${nifty.price.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})} (${nSign}${nPct}%)`);
                }
                if (sensex) {
                    const sChange = sensex.price - sensex.previousClose;
                    const sPct = ((sChange / sensex.previousClose) * 100).toFixed(2);
                    const sSign = sChange >= 0 ? '+' : '';
                    parts.push(`SENSEX: ${sensex.price.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})} (${sSign}${sPct}%)`);
                }
                if (vix) {
                    const vChange = vix.price - vix.previousClose;
                    const vPct = ((vChange / vix.previousClose) * 100).toFixed(2);
                    const vSign = vChange >= 0 ? '+' : '';
                    parts.push(`VIX: ${vix.price.toFixed(2)} (${vSign}${vPct}%)`);
                }
                el.textContent = parts.join(' | ');
            }
        });
    }

    // ─── Update the stockDatabase on the analysis page ───
    function updateStockDatabase() {
        // Check if stockDatabase exists (analysis page)
        if (typeof window.getOrCreateStock !== 'function' && !document.getElementById('stock-price-main')) return;

        Object.entries(window._tradexLivePrices).forEach(([displayName, data]) => {
            // Try to update the stockDatabase if it exists in global scope
            // The stockDatabase is defined inside a closure, so we update DOM directly
        });

        // Update the main stock display if on analysis page
        const mainPriceEl = document.getElementById('stock-price-main');
        const changeEl = document.getElementById('stock-price-change');
        const highEl = document.getElementById('stock-high');
        const lowEl = document.getElementById('stock-low');
        const volEl = document.getElementById('stock-volume');

        if (mainPriceEl) {
            // Get active stock name from the DOM
            const nameEl = document.getElementById('stock-name');
            if (nameEl) {
                const stockName = nameEl.textContent.trim();
                // Find matching live data
                let matchedData = null;
                let matchedKey = null;
                for (const [key, val] of Object.entries(window._tradexLivePrices)) {
                    if (stockName.toUpperCase().includes(key.toUpperCase()) || key.toUpperCase().includes(stockName.split(' ')[0].toUpperCase())) {
                        matchedData = val;
                        matchedKey = key;
                        break;
                    }
                }
                if (matchedData) {
                    mainPriceEl.textContent = `₹${matchedData.price.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
                    if (changeEl) {
                        const change = matchedData.price - matchedData.previousClose;
                        const pct = ((change / matchedData.previousClose) * 100).toFixed(2);
                        const sign = change >= 0 ? '+' : '';
                        changeEl.textContent = `${sign}${change.toFixed(2)} (${sign}${pct}%)`;
                        changeEl.className = changeEl.className.replace(/text-(?:tertiary|error)/g, '');
                        changeEl.classList.add(change >= 0 ? 'text-tertiary' : 'text-error');
                    }
                    if (highEl) highEl.textContent = matchedData.dayHigh.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
                    if (lowEl) lowEl.textContent = matchedData.dayLow.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
                    if (volEl) volEl.textContent = formatVolume(matchedData.volume);
                }
            }
        }
    }

    // ─── Update sidebar watchlist prices ───
    function updateSidebarPrices() {
        // Find all sidebar stock items - they contain the stock name and price
        const sidebarItems = document.querySelectorAll('[id^="sidebar-price-"]');
        sidebarItems.forEach(el => {
            const sym = el.id.replace('sidebar-price-', '').replace(/-/g, ' ');
            const data = window._tradexLivePrices[sym];
            if (data) {
                el.textContent = data.price.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
            }
        });

        // Also try to update watchlist items by searching DOM text
        const watchlistContainer = document.getElementById('stockList');
        if (watchlistContainer) {
            const items = watchlistContainer.querySelectorAll('.grid');
            items.forEach(item => {
                const nameEl = item.querySelector('.font-bold');
                if (!nameEl) return;
                const sym = nameEl.textContent.trim();
                const data = window._tradexLivePrices[sym];
                if (data) {
                    const priceEl = item.querySelector('.text-right.font-data-tabular.text-on-surface');
                    const changeEl = item.querySelector('.text-right.font-data-tabular:not(.text-on-surface)');
                    if (priceEl) {
                        priceEl.textContent = data.price.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
                    }
                    if (changeEl) {
                        const change = data.price - data.previousClose;
                        const pct = ((change / data.previousClose) * 100).toFixed(2);
                        const sign = change >= 0 ? '+' : '';
                        changeEl.textContent = `${sign}${pct}%`;
                        // Update color
                        changeEl.className = changeEl.className.replace(/text-(?:tertiary|error)/g, '');
                        changeEl.classList.add(change >= 0 ? 'text-tertiary' : 'text-error');
                    }
                }
            });
        }
    }

    // ─── Update all index cards on home page ───
    function updateHomePageCards() {
        // Update NIFTY 50 card
        const nifty = window._tradexIndexPrices['NIFTY'];
        const sensex = window._tradexIndexPrices['SENSEX'];
        const vix = window._tradexIndexPrices['VIX'];

        document.querySelectorAll('.font-data-tabular').forEach(el => {
            const text = el.textContent.trim();
            // Match common index value patterns and update
            const parent = el.closest('[class*="bg-"]');
            if (!parent) return;
            const parentText = parent.textContent;

            if (parentText.includes('NIFTY') && nifty && !parentText.includes('VIX')) {
                if (text.match(/^[\d,]+\.\d{2}$/) && parseFloat(text.replace(/,/g, '')) > 10000) {
                    el.textContent = nifty.price.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
                }
            }
        });
    }

    // ─── Master Update Function ───
    function updateAllUI() {
        updateTickerBar();
        updateStockDatabase();
        updateSidebarPrices();
        updateHomePageCards();
    }

    // ─── Initialization ───
    async function init() {
        // Check for cached data first
        const hasCached = loadCachedPrices();
        if (hasCached) {
            // Use cached data immediately, then refresh in background
            updateAllUI();
        }

        // Fetch fresh data
        await fetchAllStockPrices();
        updateAllUI();

        // Refresh every 60 seconds
        setInterval(async () => {
            await fetchAllStockPrices();
            updateAllUI();
        }, 60000);

        // Also re-apply after any DOM changes (e.g., switching stocks)
        const observer = new MutationObserver(() => {
            clearTimeout(window._tradexUpdateDebounce);
            window._tradexUpdateDebounce = setTimeout(updateAllUI, 500);
        });
        
        const stockList = document.getElementById('stockList');
        if (stockList) {
            observer.observe(stockList, { childList: true, subtree: true });
        }
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(init, 2000));
    } else {
        setTimeout(init, 2000);
    }

    // Expose for manual refresh
    window.tradexRefreshPrices = async function() {
        await fetchAllStockPrices();
        updateAllUI();
    };

})();
