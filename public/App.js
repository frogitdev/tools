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
            var floatround = Math.round(this.props.val * 100000) / 100000;
            var floatsep = floatround.toString().split('.');
            var floatraw = this.props.val.toString();
            var floatrawsep = floatraw.split('.');
            var more = floatraw.search('e') == -1 & (floatrawsep[1] === undefined || floatrawsep[1].length < 5) ? '' : '...';
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
                                floatsep[1],
                                more
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

        _this2.handleShowChange = function (k) {
            _this2.props.toggleShow(k);
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
                        React.createElement('i', { className: 'fas fa-caret-square-down fa-lg', onClick: function onClick() {
                                return _this3.handleShowChange('navi');
                            } }),
                        React.createElement(
                            'span',
                            { style: { marginLeft: '15px' } },
                            property[category],
                            ' - \uB2E8\uC704\uBCC0\uD658'
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
        key: 'render',
        value: function render() {
            var _this5 = this;

            return React.createElement(
                'div',
                { id: 'navi', className: this.props.show },
                React.createElement(
                    'div',
                    { className: 'balloon' },
                    React.createElement(
                        'div',
                        { id: 'navitop' },
                        React.createElement(
                            'p',
                            { onClick: function onClick() {
                                    return _this5.handleShowChange('navi');
                                } },
                            '\uB2EB\uAE30'
                        )
                    ),
                    React.createElement(
                        'div',
                        { id: 'navimain' },
                        React.createElement(
                            'div',
                            { className: 'cont-round' },
                            React.createElement(
                                'h2',
                                null,
                                '\uB2E8\uC704\uBCC0\uD658'
                            ),
                            React.createElement(
                                'div',
                                { className: 'navimain-links' },
                                React.createElement(
                                    'div',
                                    { className: 'navimain-link', onClick: function onClick() {
                                            return _this5.changeCategory(7);
                                        } },
                                    '\uAE38\uC774'
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'navimain-link', onClick: function onClick() {
                                            return _this5.changeCategory(1);
                                        } },
                                    '\uB113\uC774'
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'navimain-link', onClick: function onClick() {
                                            return _this5.changeCategory(9);
                                        } },
                                    '\uC9C8\uB7C9'
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'navimain-link', onClick: function onClick() {
                                            return _this5.changeCategory(15);
                                        } },
                                    '\uC2DC\uAC04'
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'cont-round', id: 'credit' },
                            React.createElement(
                                'b',
                                null,
                                'FrogIT Tools'
                            ),
                            ' BETA 0.2.1',
                            React.createElement('br', null),
                            '(C) ',
                            React.createElement(
                                'a',
                                { href: 'http://frogit.xyz', target: '_blank' },
                                'FrogIT'
                            ),
                            '. Licensed under the GPL-3.0',
                            React.createElement('br', null),
                            React.createElement(
                                'a',
                                { href: 'https://github.com/frogitdev/tools', target: '_blank' },
                                'GitHub Repository'
                            ),
                            React.createElement('br', null)
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
            _this6.setState({ val1: val, currentunit: _this6.state.unit1 });
        };

        _this6.handleValChange2 = function (val) {
            _this6.setState({ val2: val, currentunit: _this6.state.unit2 });
        };

        _this6.handleUnitChange1 = function (unit) {
            _this6.setState({ unit1: unit, currentunit: unit });
        };

        _this6.handleUnitChange2 = function (unit) {
            _this6.setState({ unit2: unit, currentunit: unit });
        };

        _this6.handleCategoryChange = function (num) {
            category = num;
            _this6.setState({ val1: 0, unit1: 0, val2: 0, unit2: 1, currentunit: 0 });
        };

        _this6.handleShowChange = function (k) {
            switch (k) {
                case 'navi':
                    var set = _this6.state.shownavi == 'f' ? 'shownavi' : 'f';
                    _this6.setState({ shownavi: set });
            }
        };

        _this6.state = {
            val1: 0,
            unit1: 0,
            val2: 0,
            unit2: 1,
            currentunit: 0,

            shownavi: 'f'
        };
        return _this6;
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            var curunit = this.state.currentunit;
            var uVal = curunit == this.state.unit1 ? this.state.val1 : tryConvert(this.state.val2, curunit, this.state.unit1);
            var lVal = (curunit == this.state.unit2 ? this.state.val2 : tryConvert(this.state.val1, curunit, this.state.unit2)).toFixed(10);

            uVal = Math.round(uVal * 1E+11) / 1E+11;
            lVal = Math.round(lVal * 1E+11) / 1E+11;

            return React.createElement(
                'div',
                { id: 'root' },
                React.createElement(
                    'main',
                    { className: this.state.shownavi },
                    React.createElement(Menu, { toggleShow: this.handleShowChange }),
                    React.createElement(Nums, { id: '0', val: uVal, valChange: this.handleValChange1, unit: this.state.unit1, unitChange: this.handleUnitChange1 }),
                    React.createElement(Nums, { id: '1', val: lVal, valChange: this.handleValChange2, unit: this.state.unit2, unitChange: this.handleUnitChange2 }),
                    React.createElement(
                        'div',
                        { id: 'middle' },
                        React.createElement(
                            'div',
                            { id: 'equal-decoration' },
                            React.createElement('i', { className: 'fas fa-equals' })
                        )
                    )
                ),
                React.createElement(Navi, { show: this.state.shownavi, toggleShow: this.handleShowChange, changeCategory: this.handleCategoryChange })
            );
        }
    }]);

    return App;
}(Comp);