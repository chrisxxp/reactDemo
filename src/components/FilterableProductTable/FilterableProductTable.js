/**
 * recact哲学demo
 */


import React from 'react';
import './FilterableProductTable.css'

/**
 * 示例应拥有如下数据
 * 1.包含所有产品的原始列表 不是state
 * 2.用户输入的搜索词 是state
 * 3.复选框是否选中的值 是state
 * 4.经过搜索筛选的产品列表 不是state
 */


// 整个示例应用的整体
class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filterText: '',
            inStockOnly: false
        }
    }

    refreshFilterText = (value) => {
        this.setState({
            filterText: value
        })
    }

    refreshInStockOnly = (value) => {
        this.setState({
            inStockOnly: value
        })
    }

    render() {
        return (
            <div>
               <h1>React 哲学</h1>
               <SearchBar 
                onChangeFilterText={this.refreshFilterText}
                onChangeStockOnly={this.refreshInStockOnly}
                filterText={this.state.filterText}
                inStockOnly={this.state.inStockOnly}
               />
               <ProductTable
                productTableJson={this.props.productTableJson}
                filterText={this.state.filterText}
                inStockOnly={this.state.inStockOnly}
               />
            </div>
        ) 
    }
}

// 接受所有的用户输入
function SearchBar(props) {
    function filterTextChange(event) {
        props.onChangeFilterText(event.target.value)
    }
    function inStockOnlyChange(event) {
        props.onChangeStockOnly(event.target.checked)
    }

    return (
        <div className="search-bar-wrapper">
            <div><input placeholder="Search..." value={props.filterText} onChange={filterTextChange}></input></div>
            <label id="Fruit">
                <input type="checkbox" name="Fruit" value={props.inStockOnly} onChange={inStockOnlyChange}></input>
                Only Show products in stock {props.inStockOnly}
            </label>
        </div>
    )
}

// 展示数据内容并根据用户输入筛选结果
function ProductTable(props) {
    return (
        <div>
            <h3 className="product-row">
                <span>Name</span>
                <span>Price</span>
            </h3>
            <ProductCategoryRow
                productTableJson={props.productTableJson}
                filterText={props.filterText}
                inStockOnly={props.inStockOnly}
            />
        </div>
    )
}

// 为每一个产品类别展示标题
function ProductCategoryRow(props) {
    function getFilterProducts(products, filterText, inStockOnly) {
        const filterPorducts = products.filter(product => {
            return (inStockOnly ? product.stocked : true) && (product.name.indexOf(filterText) > -1)
        })
        return handleProducts(filterPorducts) || []
    }

    function handleProducts(products) {
        // 整理数据 返回适合渲染的结构
        const categoryArr = []
        const categoryObj = {

        }
        products.forEach(product => {
            if (!categoryObj[product.category]) {
                categoryObj[product.category] = []
            }

            categoryObj[product.category].push(product)
        })

        Object.keys(categoryObj).forEach(item => {
            categoryArr.push({
                category: item,
                list: categoryObj[item]
            })
        })

        return categoryArr
    }

    return (
        <div>
            {getFilterProducts(props.productTableJson, props.filterText, props.inStockOnly).map((product, index) => {
                return (
                    <div key={index}>
                        <h3 className="product-category-row-title">{product.category}</h3>
                        {product.list.map((product, index) => {
                            return (
                                <ProductRow 
                                    key={index}
                                    name={product.name}  
                                    price={product.price}
                                />
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

// 每一行展示一个产品
function ProductRow(props) {
    return (
        <div className="product-row">
            <span>{props.name}</span>
            <span>{props.price}</span>
        </div>
    )
}

export default FilterableProductTable
