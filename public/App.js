var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Comp = React.Component;
var category = 9;

function tryConvert(val, curunit, cvunit) {
    val *= factor[category][curunit];
    val /= factor[category][cvunit];
    return val;
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
        key: 'render',
        value: function render() {
            var selectname = "unit" + this.props.id;
            var floatsep = this.props.val.toString().split('.');
            var unitnames = unit[category];
            var units = unitnames.map(function (value, index) {
                return React.createElement(
                    'option',
                    { key: index, value: index },
                    value
                );
            });

            return React.createElement(
                'div',
                { id: 'nums' + this.props.id, className: 'nums' },
                React.createElement(
                    'div',
                    { className: 'balloon' },
                    React.createElement(
                        'div',
                        { id: 'valgroup' + this.props.id, className: 'valgroup' },
                        React.createElement(
                            'p',
                            { id: 'vallabel' + this.props.id, className: 'vallabel' },
                            React.createElement(
                                'span',
                                { className: 'intinval' },
                                floatsep[0]
                            ),
                            React.createElement(
                                'span',
                                { className: 'floatinval' },
                                '.',
                                floatsep[1]
                            )
                        ),
                        React.createElement('input', { type: 'text', id: 'valinput' + this.props.id, className: 'valinput', pattern: '[0-9.]*', step: 'any', value: this.props.val, onChange: this.handleValChange })
                    ),
                    React.createElement(
                        'select',
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

        _this2.handleCategoryChange = function (num) {
            _this2.props.changeCategory(num);
        };

        _this2.state = {};
        return _this2;
    }

    _createClass(Menu, [{
        key: 'render',
        value: function render() {
            var _this3 = this;

            return React.createElement(
                'header',
                null,
                React.createElement(
                    'div',
                    { className: 'balloon' },
                    React.createElement(
                        'p',
                        null,
                        React.createElement(
                            'span',
                            null,
                            property[category],
                            ' - Tools Beta'
                        ),
                        React.createElement(
                            'span',
                            { style: { color: 'blue', marginLeft: '10px' } },
                            React.createElement(
                                'span',
                                { onClick: function onClick() {
                                        return _this3.handleCategoryChange(9);
                                    } },
                                '\uC9C8\uB7C9'
                            ),
                            React.createElement(
                                'span',
                                null,
                                ' '
                            ),
                            React.createElement(
                                'span',
                                { onClick: function onClick() {
                                        return _this3.handleCategoryChange(15);
                                    } },
                                '\uC2DC\uAC04'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Menu;
}(Comp);

var App = function (_Comp3) {
    _inherits(App, _Comp3);

    function App(props) {
        _classCallCheck(this, App);

        var _this4 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this4.handleValChange1 = function (val) {
            _this4.setState({ val1: val, currentunit: _this4.state.unit1 });
        };

        _this4.handleValChange2 = function (val) {
            _this4.setState({ val2: val, currentunit: _this4.state.unit2 });
        };

        _this4.handleUnitChange1 = function (unit) {
            _this4.setState({ unit1: unit, currentunit: unit });
        };

        _this4.handleUnitChange2 = function (unit) {
            _this4.setState({ unit2: unit, currentunit: unit });
        };

        _this4.handleCategoryChange = function (num) {
            category = num;
            _this4.setState({ val1: 0, unit1: 0, val2: 0, unit2: 1, currentunit: 0 });
        };

        _this4.state = {
            val1: 0,
            unit1: 0,
            val2: 0,
            unit2: 1,
            currentunit: 0
        };
        return _this4;
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            var curunit = this.state.currentunit;
            var uVal = curunit == this.state.unit1 ? this.state.val1 : tryConvert(this.state.val2, curunit, this.state.unit1);
            var lVal = curunit == this.state.unit2 ? this.state.val2 : tryConvert(this.state.val1, curunit, this.state.unit2);

            return React.createElement(
                'main',
                null,
                React.createElement(Menu, { changeCategory: this.handleCategoryChange }),
                React.createElement(Nums, { id: '0', val: uVal, valChange: this.handleValChange1, unit: this.state.unit1, unitChange: this.handleUnitChange1 }),
                React.createElement(Nums, { id: '1', val: lVal, valChange: this.handleValChange2, unit: this.state.unit2, unitChange: this.handleUnitChange2 }),
                React.createElement(
                    'div',
                    { id: 'credit' },
                    React.createElement(
                        'div',
                        { className: 'balloon' },
                        React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'b',
                                null,
                                'FrogIT Tools'
                            ),
                            ' BETA 0.1.1 ',
                            React.createElement(
                                'a',
                                { href: 'https://github.com/frogitdev/tools', target: '_blank' },
                                '(C) FrogIT'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return App;
}(Comp);