import * as React from 'react'; // jsxを使うためのもの。 ???名前つきimport害必要なのか
import { render } from 'react-dom';

const Main = (<h1>Markdown Editor</h1>)

render(Main, document.getElementById('app'));