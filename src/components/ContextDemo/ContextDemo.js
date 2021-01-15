
import React from 'react'


const themes = {
    light: {
      foreground: '#000000',
      background: '#eeeeee',
    },
    dark: {
      foreground: '#ffffff',
      background: '#cccccc',
    },
  };
const ThemeContext = React.createContext(themes.dark)
ThemeContext.displayName = 'ThemeContext2'; // 调试器的显示变为ThemeContext2
class Context extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            theme: themes.light
        }
    }

    toggleTheme = () => {
        this.setState({
            theme: this.state.theme === themes.dark
                ? themes.light
                : themes.dark
        })
    }

    render() {
        return (
            <ThemeContext.Provider value={this.state.theme}>
                <ToolBar changeTheme={this.toggleTheme}/>
            </ThemeContext.Provider>
        )
    }
}

function ToolBar(props) {
    return (
        <ThemedButton onClick={props.changeTheme}>
            Change Theme
        </ThemedButton >
    )
}

/**
 * 函数式组件写法
 */
// function Button(props) {
//     return (
//         <ThemeContext.Consumer>
//             {value => {
//                 return <button>{value}</button>
//             }}
//         </ThemeContext.Consumer>
//     )
// }

/**
 * 类组件写法 
 */
class ThemedButton  extends React.Component {
    static contextType = ThemeContext
    
    render() {
        return (
            <button {...this.props} style={{backgroundColor: this.context.background}}/>
        )
    }
}

export default Context