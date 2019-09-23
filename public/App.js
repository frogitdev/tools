var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Comp = React.Component;
var category = 7;

function tryConvert(val, curunit, cvunit) {
    val *= factor[category][curunit];
    val /= factor[category][cvunit];
    return val;
}

function numberToKorean(number) {
    var inputNumber = number < 10000 ? false : number;
    var unitWords = ["", "만", "억", "조", "경"];
    var resultArray = [];
    var resultString = "";

    for (var i = 0; i < unitWords.length; i++) {
        var unitResult = Math.floor(inputNumber % Math.pow(10000, i + 1) / Math.pow(10000, i));
        if (unitResult > 0) {
            resultArray[i] = unitResult;
        }
    }
    for (var i = 0; i < resultArray.length; i++) {
        if (resultArray[i]) {
            resultString = "" + resultArray[i] + unitWords[i] + " " + resultString;
        }
    }
    return inputNumber >= 1E+20 ? resultString + ' 초과' : resultString;
}

var Nums = function (_Comp) {
    _inherits(Nums, _Comp);

    function Nums(props) {
        _classCallCheck(this, Nums);

        var _this = _possibleConstructorReturn(this, (Nums.__proto__ || Object.getPrototypeOf(Nums)).call(this, props));

        _this.handleValChange = function (e) {
            var input = e.target.value;
            var result = 0;
            if (input.substr(1, input.length - 1) == '.') {
                result = input;
            } else if (input != '') {
                result = parseFloat(input);
            }
            _this.props.valChange(result);
        };

        _this.handleUnitChange = function (e) {
            _this.props.unitChange(e.target.value);
        };

        _this.state = {};
        return _this;
    }

    _createClass(Nums, [{
        key: "render",
        value: function render() {
            var selectname = "unit" + this.props.id;
            var floatround = Math.round(this.props.val * 100000) / 100000;
            var floatsep = floatround.toString().split('.');
            var floatraw = this.props.val.toString();
            var floatrawsep = floatraw.split('.');
            var more = floatraw.search('e') == -1 & (floatrawsep[1] === undefined || floatrawsep[1].length < 5) ? '' : '...';
            var hangeul = numberToKorean(floatsep[0]);
            var unitnames = unit[category];
            var units = unitnames.map(function (value, index) {
                return React.createElement(
                    "option",
                    { key: index, value: index },
                    value
                );
            });

            return React.createElement(
                "div",
                { id: 'nums' + this.props.id, className: "nums" },
                React.createElement(
                    "div",
                    { className: "balloon" },
                    React.createElement(
                        "div",
                        { id: 'valgroup' + this.props.id, className: "valgroup" },
                        React.createElement(
                            "p",
                            { id: 'vallabel' + this.props.id, className: "vallabel" },
                            React.createElement(
                                "span",
                                { className: "intinval" },
                                floatsep[0]
                            ),
                            React.createElement(
                                "span",
                                { className: "floatinval" },
                                ".",
                                floatsep[1],
                                more
                            )
                        ),
                        React.createElement("input", { type: "text", id: 'valinput' + this.props.id, className: "valinput", pattern: "[0-9.]*", step: "any", value: this.props.val, onChange: this.handleValChange })
                    ),
                    React.createElement(
                        "p",
                        { className: "valmilsep" },
                        hangeul
                    ),
                    React.createElement(
                        "select",
                        { name: selectname, value: this.props.unit, onChange: this.handleUnitChange },
                        units
                    )
                )
            );
        }
    }]);

    return Nums;
}(Comp);

var Menu = function (_Comp2) {
    _inherits(Menu, _Comp2);

    function Menu(props) {
        _classCallCheck(this, Menu);

        var _this2 = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));

        _this2.handleShowChange = function (k) {
            _this2.props.toggleShow(k);
        };

        _this2.state = {};
        return _this2;
    }

    _createClass(Menu, [{
        key: "render",
        value: function render() {
            var _this3 = this;

            return React.createElement(
                "header",
                null,
                React.createElement(
                    "div",
                    { className: "balloon" },
                    React.createElement(
                        "p",
                        null,
                        React.createElement("i", { className: "fas fa-caret-square-down fa-lg", onClick: function onClick() {
                                return _this3.handleShowChange('navi');
                            } }),
                        React.createElement(
                            "span",
                            { style: { marginLeft: '15px' } },
                            property[category],
                            " - \uB2E8\uC704\uBCC0\uD658"
                        )
                    )
                )
            );
        }
    }]);

    return Menu;
}(Comp);

var Navi = function (_Comp3) {
    _inherits(Navi, _Comp3);

    function Navi(props) {
        _classCallCheck(this, Navi);

        var _this4 = _possibleConstructorReturn(this, (Navi.__proto__ || Object.getPrototypeOf(Navi)).call(this, props));

        _this4.handleShowChange = function (k) {
            _this4.props.toggleShow(k);
        };

        _this4.changeCategory = function (num) {
            _this4.props.changeCategory(num);
            _this4.handleShowChange('navi');
        };

        _this4.state = {};
        return _this4;
    }

    _createClass(Navi, [{
        key: "render",
        value: function render() {
            var _this5 = this;

            return React.createElement(
                "div",
                { id: "navi", className: this.props.show },
                React.createElement(
                    "div",
                    { className: "balloon" },
                    React.createElement(
                        "div",
                        { id: "navitop" },
                        React.createElement(
                            "p",
                            { onClick: function onClick() {
                                    return _this5.handleShowChange('navi');
                                } },
                            "\uB2EB\uAE30"
                        )
                    ),
                    React.createElement(
                        "div",
                        { id: "navimain" },
                        React.createElement(
                            "div",
                            { className: "cont-round" },
                            React.createElement(
                                "h2",
                                null,
                                "\uB2E8\uC704\uBCC0\uD658"
                            ),
                            React.createElement(
                                "div",
                                { className: "navimain-links" },
                                React.createElement(
                                    "div",
                                    { className: "navimain-link", onClick: function onClick() {
                                            return _this5.changeCategory(7);
                                        } },
                                    "\uAE38\uC774"
                                ),
                                React.createElement(
                                    "div",
                                    { className: "navimain-link", onClick: function onClick() {
                                            return _this5.changeCategory(1);
                                        } },
                                    "\uB113\uC774"
                                ),
                                React.createElement(
                                    "div",
                                    { className: "navimain-link", onClick: function onClick() {
                                            return _this5.changeCategory(18);
                                        } },
                                    "\uBD80\uD53C"
                                ),
                                React.createElement(
                                    "div",
                                    { className: "navimain-link", onClick: function onClick() {
                                            return _this5.changeCategory(9);
                                        } },
                                    "\uC9C8\uB7C9"
                                ),
                                React.createElement(
                                    "div",
                                    { className: "navimain-link", onClick: function onClick() {
                                            return _this5.changeCategory(16);
                                        } },
                                    "\uC18D\uB3C4"
                                ),
                                React.createElement(
                                    "div",
                                    { className: "navimain-link", onClick: function onClick() {
                                            return _this5.changeCategory(15);
                                        } },
                                    "\uC2DC\uAC04"
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "cont-round", id: "credit" },
                            React.createElement(
                                "b",
                                null,
                                "FrogIT Tools"
                            ),
                            " BETA 0.3.0",
                            React.createElement("br", null),
                            "(C) ",
                            React.createElement(
                                "a",
                                { href: "http://frogit.xyz", target: "_blank" },
                                "FrogIT"
                            ),
                            ". Licensed under the GPL-3.0",
                            React.createElement("br", null),
                            React.createElement(
                                "a",
                                { href: "https://github.com/frogitdev/tools", target: "_blank" },
                                "GitHub Repository"
                            ),
                            React.createElement("br", null)
                        )
                    )
                )
            );
        }
    }]);

    return Navi;
}(Comp);

var App = function (_Comp4) {
    _inherits(App, _Comp4);

    function App(props) {
        _classCallCheck(this, App);

        var _this6 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this6.handleValChange1 = function (val) {
            _this6.setState({ upper: { val: val, unit: _this6.state.upper.unit }, focused: 'upper' });
        };

        _this6.handleValChange2 = function (val) {
            _this6.setState({ lower: { val: val, unit: _this6.state.lower.unit }, focused: 'lower' });
        };

        _this6.handleUnitChange1 = function (unit) {
            _this6.setState({ upper: { unit: unit, val: _this6.state[_this6.state.focused].val } });
        };

        _this6.handleUnitChange2 = function (unit) {
            _this6.setState({ lower: { unit: unit, val: _this6.state[_this6.state.focused].val } });
        };

        _this6.handleCategoryChange = function (num) {
            category = num;
            _this6.setState({ upper: { val: 0, unit: 0 }, lower: { val: 0, unit: 1 }, focused: 'upper' });
        };

        _this6.handleShowChange = function (k) {
            switch (k) {
                case 'navi':
                    var set = _this6.state.shownavi == 'f' ? 'shownavi' : 'f';
                    _this6.setState({ shownavi: set });
            }
        };

        _this6.state = {
            upper: {
                val: 0,
                unit: 0
            },
            lower: {
                val: 0,
                unit: 1
            },
            focused: 'upper',

            shownavi: 'f'
        };
        return _this6;
    }

    _createClass(App, [{
        key: "render",
        value: function render() {
            var focused = this.state.focused;
            var uVal = focused == 'upper' ? this.state.upper.val : tryConvert(this.state.lower.val, this.state.lower.unit, this.state.upper.unit);
            var lVal = focused == 'lower' ? this.state.lower.val : tryConvert(this.state.upper.val, this.state.upper.unit, this.state.lower.unit);
            uVal = Math.round(uVal * 1E+11) / 1E+11;
            lVal = Math.round(lVal * 1E+11) / 1E+11;
            var percentage = Math.min(tryConvert(this.state[focused].val, this.state[focused].unit, 0) / permax[category] * 100, 300);

            return React.createElement(
                "div",
                { id: "root" },
                React.createElement(
                    "main",
                    { className: this.state.shownavi },
                    React.createElement(Menu, { toggleShow: this.handleShowChange }),
                    React.createElement(Nums, { id: "0", val: uVal, valChange: this.handleValChange1, unit: this.state.upper.unit, unitChange: this.handleUnitChange1 }),
                    React.createElement(Nums, { id: "1", val: lVal, valChange: this.handleValChange2, unit: this.state.lower.unit, unitChange: this.handleUnitChange2 }),
                    React.createElement(
                        "div",
                        { id: "middle" },
                        React.createElement(
                            "div",
                            { id: "equal-decoration" },
                            React.createElement("i", { className: "fas fa-equals" })
                        )
                    ),
                    React.createElement("div", { id: "indicator", style: { height: percentage + "vh" } })
                ),
                React.createElement(Navi, { show: this.state.shownavi, toggleShow: this.handleShowChange, changeCategory: this.handleCategoryChange })
            );
        }
    }]);

    return App;
}(Comp);