import React, { Component } from 'react';

class Video extends Component {

  constructor () {
    super ();
    this.state = {
      sources: [],
      sourceList: [],
      testSource: '',
      currentSource: ''
    }
  }
  changeSource (link) {
    this.setState({
      currentSource: link
    })
  }

  convertLink (link) {
    if (link.includes('vidzi.tv')) { // Done!
      if (link.includes('https://vidzi.tv')) {
        return (link.slice(0, 17) + 'embed-' + link.slice(17))
      } else {
        return (link.slice(0, 16) + 'embed-' + link.slice(16))
      }
    }
    else if (link.includes('openload.co')) { // Done!
      return link.replace('/f/', '/embed/')
    }
    else if (link.includes('estream.to')) {
      console.log('estream')
      return link
    }
    else if (link.includes('http://vidto.me')) { // Done!
      return link.slice(0, 16) + 'embed-' + link.slice(16, 28) + '-640x360.html'
    }
    else if (link.includes('http://vidup.me')) { // Done!
      return link.slice(0, 16) + 'embed-' + link.slice(16, 28) + '-640x360.html'
    }
    else if (link.includes('vshare.eu')) {
      console.log('vshare')
      return link
    }
    else if (link.includes('streamin.to')) {
      console.log('steamin')
      return link
    }
    else if (link.includes('thevideo.me')) { // Done!
      return link.slice(0, 19) + 'embed-' + link.slice(19) + '.html'
    }
    else if (link.includes('vidtodo.com')) {
      console.log(link)
      return 'todooo: ' + link.slice(0, 19) + 'embed-' + link.slice(19) +  '.html'
    }
    else if (link.includes('vidlox.tv')) {
      console.log('vidlox')
      return link
    }
    else {
      // Don't return anything if it doesn't follow under these categories
      return
    }
  }
  componentDidMount () {
    const parser = new DOMParser()
    const corsProxy = 'https://dionysus-cors.herokuapp.com/'

    let links = [];

    const filterLink = link => (
      // Matches anything before an equal sign and replaces it with an empty string
      link.replace(/.+\=/, '')
    )
    // mr-robot-season-3-episode-2
    fetch(corsProxy + 'http://projectfreetv.bz/mr-robot-season-1-episode-6/')
      .then(res => res.text())
      .catch(err => console.log('Darn it, ' + err))
      .then(data => {
        // DOMParser is the bes thing ever
        let doc = parser.parseFromString(data, "text/html")
        // Without this selector, I got a lot of dupes
        doc.querySelectorAll('td > a:first-child').forEach(elem => {

          // Check to make sure it includes external.php (will be filtered out later)
          if (elem.href.includes('external.php')) {

            // Pushes filtered link to array
            links.push(filterLink(elem.href))
          }
        })
        // Some filtering and sorting (also converts from normal link to embed link)
        links = links.map(link => this.convertLink(link)).sort().filter(n => n !== undefined)
        this.setState({
          sources: links,
          sourceList: links.map(link => <li><button onClick={() => this.changeSource(link)}>{link}</button></li>)
        })
        console.log(links)
      })
      .catch(err => console.log('Darn it, ' + err))
      }

  render() {
    return (
      <div className="App">
        <h2>Ayy watch this!</h2>
        <ul>
        {this.state.sourceList}
        </ul>
        <iframe title="video" allowFullScreen src={this.state.currentSource} />
      </div>
    );
  }
}

export default Video;
