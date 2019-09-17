const Comp = React.Component
var category = 7

function tryConvert(val, curunit, cvunit) {
    val *= factor[category][curunit]
    val /= factor[category][cvunit]
    return val
}

class Nums extends Comp {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    handleValChange = (e) => {
        var input = e.target.value
        var result = 0
        if (input.substr(1, input.length-1) == '.') {
            result = input
        } else if (input!='') {
            result = parseFloat(input)
        }
        this.props.valChange(result)
    }

    handleUnitChange = (e) => {
        this.props.unitChange(e.target.value)
    }

    render() {
        const selectname = "unit" + this.props.id
        const floatround = Math.round(this.props.val*100000)/100000
        const floatsep = floatround.toString().split('.')
        const floatraw = this.props.val.toString()
        const floatrawsep = floatraw.split('.')
        const more = (floatraw.search('e')==-1 & (floatrawsep[1]===undefined || floatrawsep[1].length<5)) ? '' : '...'
        const unitnames = unit[category]
        const units = unitnames.map((value, index) => {
            return <option key={index} value={index}>{value}</option>
        })

        return (
            <div id={'nums'+this.props.id} className="nums">
                <div className="balloon">
                    <div id={'valgroup'+this.props.id} className="valgroup">
                        <p id={'vallabel'+this.props.id} className="vallabel">
                            <span className="intinval">{floatsep[0]}</span>
                            <span className="floatinval">.{floatsep[1]}{more}</span>
                        </p>
                        <input type="text" id={'valinput'+this.props.id} className="valinput" pattern="[0-9.]*" step="any" value={this.props.val} onChange={this.handleValChange}></input>
                    </div>
                    <select name={selectname} value={this.props.unit} onChange={this.handleUnitChange}>
                        {units}
                    </select>
                </div>
            </div>
        )
    }
}

class Menu extends Comp {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    handleShowChange = (k) => {
        this.props.toggleShow(k)
    }
    
    render() {
        return (
            <header>
                <div className="balloon">
                    <p>
                        <i className="fas fa-caret-square-down fa-lg" onClick={() => this.handleShowChange('navi')}></i>
                        <span style={{marginLeft: '15px'}}>{property[category]} - 단위변환</span>
                    </p>
                </div>
            </header>
        )
    }
}

class Navi extends Comp {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    handleShowChange = (k) => {
        this.props.toggleShow(k)
    }

    changeCategory = (num) => {
        this.props.changeCategory(num)
        this.handleShowChange('navi')
    }

    render() {
        return (
            <div id="navi" className={this.props.show}>
                <div className="balloon">
                    <div id="navitop">
                        <p onClick={() => this.handleShowChange('navi')}>닫기</p>
                    </div>
                    <div id="navimain">
                        <div className="cont-round">
                            <h2>단위변환</h2>
                            <div className="navimain-links">
                                <div className="navimain-link" onClick={() => this.changeCategory(7)}>길이</div>
                                <div className="navimain-link" onClick={() => this.changeCategory(1)}>넓이</div>
                                <div className="navimain-link" onClick={() => this.changeCategory(9)}>질량</div>
                                <div className="navimain-link" onClick={() => this.changeCategory(15)}>시간</div>
                            </div>
                        </div>
                        <div className="cont-round" id="credit">
                            <b>FrogIT Tools</b> BETA 0.2.1<br />
                            (C) <a href="http://frogit.xyz" target="_blank">FrogIT</a>. Licensed under the GPL-3.0<br />
                            <a href="https://github.com/frogitdev/tools" target="_blank">GitHub Repository</a><br />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class App extends Comp {
    constructor(props) {
        super(props)
        this.state = {
            val1: 0,
            unit1: 0,
            val2: 0,
            unit2: 1,
            currentunit: 0,

            shownavi: 'f'
        }
    }

    handleValChange1 = (val) => {
        this.setState({val1: val, currentunit: this.state.unit1})
    }

    handleValChange2 = (val) => {
        this.setState({val2: val, currentunit: this.state.unit2})
    }

    handleUnitChange1 = (unit) => {
        this.setState({unit1: unit, currentunit: unit})
    }

    handleUnitChange2 = (unit) => {
        this.setState({unit2: unit, currentunit: unit})
    }

    handleCategoryChange = (num) => {
        category = num
        this.setState({val1: 0, unit1: 0, val2: 0, unit2: 1, currentunit: 0})
    }

    handleShowChange = (k) => {
        switch (k) {
            case 'navi':
                var set = (this.state.shownavi=='f') ? 'shownavi' : 'f'
                this.setState({shownavi: set})
        }
    }

    render() {
        var curunit = this.state.currentunit
        var uVal = ((curunit==this.state.unit1) ? this.state.val1 : tryConvert(this.state.val2, curunit, this.state.unit1))
        var lVal = ((curunit==this.state.unit2) ? this.state.val2 : tryConvert(this.state.val1, curunit, this.state.unit2)).toFixed(10)

        uVal = Math.round(uVal*1E+11)/1E+11
        lVal = Math.round(lVal*1E+11)/1E+11
        
        return (
            <div id="root">
                <main className={this.state.shownavi}>
                    <Menu toggleShow={this.handleShowChange} />

                    <Nums id="0" val={uVal} valChange={this.handleValChange1} unit={this.state.unit1} unitChange={this.handleUnitChange1} />

                    <Nums id="1" val={lVal} valChange={this.handleValChange2} unit={this.state.unit2} unitChange={this.handleUnitChange2} />

                    <div id="middle">
                        <div id="equal-decoration"><i className="fas fa-equals"></i></div>
                    </div>
                </main>
                <Navi show={this.state.shownavi} toggleShow={this.handleShowChange} changeCategory={this.handleCategoryChange} />
            </div>
        )
    }
}
