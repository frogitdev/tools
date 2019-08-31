const Comp = React.Component
var category = 9

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
        const floatsep = this.props.val.toString().split('.')
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
                            <span className="floatinval">.{floatsep[1]}</span>
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

    handleCategoryChange = (num) => {
        this.props.changeCategory(num)
    }

    render() {
        return (
            <header>
                <div className="balloon">
                    <p>
                        <span>{property[category]} - Tools Beta</span>
                        <span style={{color: 'blue', marginLeft: '10px'}}>
                            <span onClick={() => this.handleCategoryChange(9)}>질량</span>
                            <span> </span>
                            <span onClick={() => this.handleCategoryChange(15)}>시간</span>
                        </span>
                    </p>
                </div>
            </header>
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
            currentunit: 0
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

    render() {
        const curunit = this.state.currentunit
        const uVal = (curunit==this.state.unit1) ? this.state.val1 : tryConvert(this.state.val2, curunit, this.state.unit1)
        const lVal = (curunit==this.state.unit2) ? this.state.val2 : tryConvert(this.state.val1, curunit, this.state.unit2)

        return (
            <main>
                <Menu changeCategory={this.handleCategoryChange} />
                <Nums id="0" val={uVal} valChange={this.handleValChange1} unit={this.state.unit1} unitChange={this.handleUnitChange1} />
                <Nums id="1" val={lVal} valChange={this.handleValChange2} unit={this.state.unit2} unitChange={this.handleUnitChange2} />
                <div id="credit">
                    <div className="balloon">
                    <span><b>FrogIT Tools</b> BETA 0.1.2 <a href="https://github.com/frogitdev/tools" target="_blank">(C) FrogIT</a></span>
                    </div>
                </div>
            </main>
        )
    }
}
