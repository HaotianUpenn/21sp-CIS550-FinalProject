import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

export default class PageNavbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            navDivs: [],
        }
    }

    componentDidMount() {


        const pageList = ['Leader Board', 'Country', 'Matches'];

        let navbarDivs = pageList.map((page, i) => {
            let active_flag = "";
            if (this.props.active === page) {
                active_flag = " active";
            }

            if (page==="Country") {

                return <div className="dropdown">
                    <a className={"nav-item nav-link"+active_flag}>Country</a>
                    <div className="dropdown-content">
                        <a href={"/country/Brazil"}>Brazil</a>
                        <a href={"/country/Germany"}>Germany</a>
                        <a href={"/country/Italy"}>Italy</a>
                        <a href={"/country/Argentina"}>Argentina</a>
                        <a href={"/country/Uruguay"}>Uruguay</a>
                        <a href={"/country/France"}>France</a>
                        <a href={"/country/England"}>England</a>
                        <a href={"/country/Spain"}>Spain</a>
                    </div>
                </div>
            } else {
                return <a className={"nav-item nav-link"+active_flag} key={i}
                          href={"/" + page}>{page.charAt(0).toUpperCase() + page.substring(1, page.length)}</a>
            }
        })

        this.setState({
            navDivs: navbarDivs
        });
    }

    render() {
        return (
            <div className="PageNavbar">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <span className="navbar-brand center">FIFA World Cup</span>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            {this.state.navDivs}
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}