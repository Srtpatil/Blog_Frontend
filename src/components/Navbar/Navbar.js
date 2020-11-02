import "./Navbar.css";
import React, { Component } from "react";
import classnames from "classnames";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prevScrollpos: window.pageYOffset,
      visible: true,
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    let visible = currentScrollPos > 400;

    if (currentScrollPos <= 20) {
      visible = true;
    }

    this.setState({
      prevScrollpos: currentScrollPos,
      visible,
    });
  };

  render() {
    return (
      <header
        className={classnames("navbar", {
          "navbar--hidden": !this.state.visible,
        })}
      >
        <nav className="navbarContainer">
          <div className="navbarLogo">Logo</div>
          <ul class="navigationLinks">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Portfolio</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Navbar;
