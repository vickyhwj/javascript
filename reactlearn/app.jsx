var cb;
class GoodList extends React.Component {
    constructor() {
        this.state = {
            good: [
                { "goodname": "a1", checked: true, count: 2 },
                { "goodname": "a2", checked: false, count: 1 }
            ],
            changeAll: false
        }
    }
    componentDidMount() {
        $.ajax({
            type: "get",
            url: "booklist.json",
            data: "",
            success: (response) => {
                this.setState({ good: response })
            }
        });
    }
    editCount(goodname, count) {
        var state = this.state;
        var good = state.good;
        for (var i = 0; i < good.length; ++i) {
            if (good[i].goodname == goodname) {

                if (count == 0)
                    good.splice(i, 1)
                else
                    good[i].count = count;
                break;

            }
        }
        this.setState({
            "good": good,
            changeAll: state.changeAll
        })
    }

    updateChecked(goodname) {
        var changeAll = this.state.changeAll;
        var list = this.state.good;
        for (var i = 0; i < list.length; ++i) {
            if (list[i].goodname == goodname) {
                list[i].checked = !list[i].checked;
                if (!list[i].checked)
                    changeAll = false;
                break;
            }
        }
        this.setState({ "good": list, changeAll: changeAll })
    }

    allUpdateChecked() {
        var state = this.state;
        state.changeAll = !state.changeAll;
        var list = state.good;

        if (state.changeAll) {
            var list = state.good;
            for (var i = 0; i < list.length; ++i) {
                list[i].checked = true;


            }
        }
        else {
            var list = state.good;
            for (var i = 0; i < list.length; ++i) {

                list[i].checked = false;


            }
        }
        this.setState({ "good": state.good, "changeAll": state.changeAll })
    }
    removeChecked() {
        var state = this.state;
        for (var i = 0; i < state.good.length;)
            if (state.good[i].checked) {
                state.good.splice(i, 1);
            }
            else {
                ++i;
            }

        this.setState({ good: state.good, changeAll: state.changeAll })
    }
    render() {

        var list = this.state.good.map(function (params) {
            return (
                <div>
                    <GoodItem goodname={params.goodname} checked={params.checked}
                        updateChecked={this.updateChecked.bind(this)} count={params.count}
                        editCount={this.editCount.bind(this)} />
                </div>
            )
        }.bind(this))
        return (
            <ul className="list-group">
                <div>
                    <input type="checkbox" onChange={() => { this.allUpdateChecked() }} checked={this.state.changeAll ? "checked" : ""} />
                    <button onClick={() => { this.removeChecked() }} className="btn btn-warning">remove choose</button>
                </div>
                {list}
            </ul>
        );
    }
}

class GoodItem extends React.Component {
    constructor(props) {
        this.state = new Object();
        this.state.count = props.count

    }
    editCount() {
        var c = this.refs.count.getDOMNode().value;
        this.setState({ count: c })
        this.props.editCount(this.props.goodname, c)

    }

    render() {
        if (this.props.checked)
            return (
                <li className="list-group-item">

                    <input type="checkbox" onChange={() => { this.props.updateChecked(this.props.goodname) }}
                        checked="cheched" />

                    <font>{this.props.goodname}</font>
                    <button type="button" className="btn btn-default" onClick={() => { this.props.editCount(this.props.goodname, this.props.count + 1) }}><span className="glyphicon glyphicon-plus"></span></button>
                    <input type="text" className="form-control" value={this.props.count} ref="count" onChange={this.editCount.bind(this)} />
                    <button type="button" className="btn btn-default" onClick={() => { this.props.editCount(this.props.goodname, this.props.count - 1) }}><span className="glyphicon glyphicon-minus"></span></button>
                </li>
            );
        else
            return (
                <li className="list-group-item">


                    <input type="checkbox" onChange={() => { this.props.updateChecked(this.props.goodname) }}
                    />

                    <font>{this.props.goodname}</font>
                    <button type="button" className="btn btn-default" onClick={() => { this.props.editCount(this.props.goodname, this.props.count + 1) }}><span className="glyphicon glyphicon-plus"></span></button>
                    <input type="text" className="form-control" value={this.props.count} ref="count" onChange={this.editCount.bind(this)} />
                    <button type="button" className="btn btn-default" onClick={() => { this.props.editCount(this.props.goodname, this.props.count - 1) }}><span className="glyphicon glyphicon-minus"></span></button>
                </li>
            );
    }
}
var x = React.render(
    <GoodList />, document.getElementById("content")
)
