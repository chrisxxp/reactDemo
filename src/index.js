import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import Game from './components/GobangGame/GobangGame.js'
import ContextDemo from './components/ContextDemo/ContextDemo.js'
import './index.css';
// import FilterableProductTable from './components/FilterableProductTable/FilterableProductTable.js'

/**
 * react.lazy 一般搭配路由使用
 * 结合Suspense 实现loading...
 */
const FilterableProductTable = React.lazy(() => import('./components/FilterableProductTable/FilterableProductTable.js'))





// 数据源
const productTableJson = [
    { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
    { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
    { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
    { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
    { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
    { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
];



function Index(props) {
    return (
        <div>
            <Game/>
            <Suspense fallback={<div>Loading...</div>}>
                <FilterableProductTable productTableJson={productTableJson}/>
            </Suspense>
            <ContextDemo/>
        </div>
    )
}

// ========================================

ReactDOM.render(
    <Index />,
    document.getElementById('root')
);
