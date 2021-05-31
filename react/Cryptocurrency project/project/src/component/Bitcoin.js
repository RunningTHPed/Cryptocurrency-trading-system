import React from 'react'

function Bitcoin() {
    return (
        <div className = "">
            <div className = "row">
                <div className = "col">
                    Column
                </div>
                <div className = "col">
                    {/* <!-- TradingView Widget BEGIN --> */}
                    <div className="tradingview-widget-container">
                    <div id="tradingview_eb569"></div>
                    <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/BTCUSDT/?exchange=BITBAY" rel="noopener" target="_blank"><span class="blue-text">BTCUSDT Chart</span></a> by TradingView</div>
                    
                    </div>
                    {/* <!-- TradingView Widget END --> */}
                </div>
                <div className = "col">
                    <div className = "list-group">
                        <a href = "/Bitcoin" className = "list-group-item list-group-item-success" aria-current="true">BITCOIN</a>
                        <a href="#" className = "list-group-item list-group-item-action">ETHEREUM</a>
                        <a href="#" className = "list-group-item list-group-item-action">BINANCE COIN</a>
                        <a href="#" className = "list-group-item list-group-item-action">CARDANO</a>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Bitcoin;