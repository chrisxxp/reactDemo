import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
function Square(props) {
    return (
        <button
            className="square"
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => { this.props.onClick(i) }}
            />
        );
    }

    render() {
        const x= ['','','']
        const y= ['','','']
        return (
            <div>
                {x.map((item, index) => {
                    return (
                    <div className="board-row">
                        {
                            y.map((item2, index2) => {
                                return this.renderSquare(3*index + index2)
                            })
                        }
                    </div>)
                })}
                {/* <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div> */}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            xIsNext: true,
            stepNumber: 0,
            history: [
                {
                    squares: Array(9).fill(null),
                    coord: ''
                }
            ]
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber+1);
        const current = history[history.length-1]
        const squares = current.squares.slice()
        if (calculateWinner(squares) || squares[i]) {
            return
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O'
        this.setState({
            xIsNext: !this.state.xIsNext,
            history: history.concat([{
                squares: squares,
                coord: getCoords(i)
            }]),
            stepNumber: history.length
        })
    }

    jumpTo(step) {
        this.setState({
            xIsNext: (step % 2) === 0,
            stepNumber: step
        })
    }

    render() {
        const history = this.state.history
        const current = history[this.state.stepNumber]
        const winner = calculateWinner(current.squares)
        const moves = history.map((step, move) => {
            const desc = move ? 
            'Go to move #' + move  + ' 坐标为：' + step.coord :
            'Go to game start';

            return (
                <li key={move} className={this.state.stepNumber === move ? 'active' : '' }>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })

        let status;
        if (winner) {
            status = 'Winner: ' + winner
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        
        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

/**
 * 获取当前点击的坐标
 * @param {当前index} index 
 */
function getCoords(index) {
    index = index + 1
    const y = index%3 === 0 ? '3' : index%3
    let x = 0
    const xArr = [
        [1,2,3],
        [4,5,6],
        [7,8,9]
    ]
    xArr.forEach((item, k) => {
        if (item.indexOf(index) > -1) {
            x = k+1
        }
    })

    return `${x}, ${y}`
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
