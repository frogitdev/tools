const Comp = React.Component

function numberToKorean(number) {
    var inputNumber = number < 10000 ? false : number
    var unitWords = ["", "만", "억", "조", "경"]
    var resultArray = []
    var resultString = ""

    for (var i=0; i<unitWords.length; i++) {
        var unitResult = Math.floor((inputNumber % Math.pow(10000, i+1)) / Math.pow(10000, i))
        if (unitResult > 0) {
            resultArray[i] = unitResult
        }
    }
    for (var i=0; i<resultArray.length; i++) {
        if (resultArray[i]) {
            resultString = `${resultArray[i]}${unitWords[i]} ${resultString}`
        }
    }
    return (inputNumber >= 1E+20) ? resultString+' 초과' : resultString
}

class Unit_Nums extends Comp {
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
        const hangeul = numberToKorean(floatsep[0])
        const unitnames = unit[this.props.category]
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
                    <p className="valmilsep">{hangeul}</p>
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
                    <p onClick={() => this.handleShowChange('navi')}>
                        <i className="fas fa-caret-square-down fa-lg"></i>
                        <span style={{marginLeft: '15px'}}>{property[this.props.category]} - 단위변환</span>
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
                                <div className="navimain-link" onClick={() => this.changeCategory(18)}>부피</div>
                                <div className="navimain-link" onClick={() => this.changeCategory(9)}>질량</div>
                                <div className="navimain-link" onClick={() => this.changeCategory(16)}>속도</div>
                                <div className="navimain-link" onClick={() => this.changeCategory(15)}>시간</div>
                            </div>
                        </div>
                        <div className="cont-round" id="credit">
                            <b>FrogIT Tools</b> BETA 0.3.1<br />
                            (C) <a href="http://frogit.xyz" target="_blank">FrogIT</a>. Licensed under the GPL-3.0<br />
                            <a href="https://github.com/frogitdev/tools" target="_blank">GitHub Repository</a><br />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class Unit extends Comp {
    constructor(props) {
        super(props)
        this.state = {
            category: 0,
            upper: {
                val: 0,
                unit: 0
            },
            lower: {
                val: 0,
                unit: 1
            },
            focused : 'upper'
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.category !== state.category) {
            return {
                upper: {val: 0, unit: 0}, lower: {val: 0, unit: 1}, focused : 'upper',
                category: props.category
            }
        }
        return null
    }

    handleValChange1 = (val) => {
        this.setState({upper: {val: val, unit: this.state.upper.unit}, focused : 'upper'})
    }

    handleValChange2 = (val) => {
        this.setState({lower: {val: val, unit: this.state.lower.unit}, focused : 'lower'})
    }

    handleUnitChange1 = (unit) => {
        this.setState({upper: {unit: unit, val: this.state[this.state.focused].val}})
    }

    handleUnitChange2 = (unit) => {
        this.setState({lower: {unit: unit, val: this.state[this.state.focused].val}})
    }

    tryConvert = (val, curunit, cvunit) => {
        val *= factor[this.state.category][curunit]
        val /= factor[this.state.category][cvunit]
        return val
    }

    render() {
        var focused = this.state.focused
        var uVal = (focused=='upper') ? this.state.upper.val : this.tryConvert(this.state.lower.val, this.state.lower.unit, this.state.upper.unit)
        var lVal = (focused=='lower') ? this.state.lower.val : this.tryConvert(this.state.upper.val, this.state.upper.unit, this.state.lower.unit)
        uVal = Math.round(uVal*1E+11)/1E+11
        lVal = Math.round(lVal*1E+11)/1E+11
        var percentage = Math.min(this.tryConvert(this.state[focused].val, this.state[focused].unit, 0) / permax[this.props.category] * 100, 300)
        
        return (
            <main className={this.props.shownavi}>
                <Menu toggleShow={this.props.toggleShow} category={this.state.category} />

                <Unit_Nums id="0" category={this.state.category} val={uVal} valChange={this.handleValChange1} unit={this.state.upper.unit} unitChange={this.handleUnitChange1} />

                <Unit_Nums id="1" category={this.state.category} val={lVal} valChange={this.handleValChange2} unit={this.state.lower.unit} unitChange={this.handleUnitChange2} />

                <div id="middle">
                    <div id="equal-decoration"><i className="fas fa-equals"></i></div>
                </div>

                <div id="indicator" style={{height: `${percentage}vh`}}>
                </div>
            </main>
        )
    }
}

class App extends Comp {
    constructor(props) {
        super(props)
        this.state = {
            shownavi: 'f',
            category: 7
        }
    }

    handleCategoryChange = (num) => {
        this.setState({category: num})
    }

    handleShowChange = (k) => {
        switch (k) {
            case 'navi':
                var set = (this.state.shownavi=='f') ? 'shownavi' : 'f'
                this.setState({shownavi: set})
        }
    }

    render() {
        return (
            <div id="root">
                <Unit shownavi={this.state.shownavi} category={this.state.category} toggleShow={this.handleShowChange} />
                <Navi show={this.state.shownavi} category={this.state.category} toggleShow={this.handleShowChange} changeCategory={this.handleCategoryChange} />
            </div>
        )
    }
}
