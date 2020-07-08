import React, { Component } from 'react';

class Rank extends Component {
  state = {
    badge: ''
  }

  componentDidMount() {
    this.generateEmoji();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.entries !== this.props.entries) {
      this.generateEmoji();
    }
  }

  generateEmoji = () => {
    const { entries } = this.props;
    fetch(`https://gjpxgemyya.execute-api.us-east-2.amazonaws.com/default/SmartBrainRank?rank=${entries}`)
      .then(resp => resp.json()).then(data => {
        if (data) {
          this.setState({ badge: data.badge })
        }
      }).catch(err => console.log(err));
  }

  render() {
    const { name, entries } = this.props;
    return (
      <div>
        <div className='white f3'>
          {`${name}, your current entry count is...`}
        </div>
        <div className='white f1'>
          {entries}
          <span className="ml5 f3">{`Badge : ${this.state.badge}`}</span>
        </div>
      </div>
    );
  }
}

export default Rank;