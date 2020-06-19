import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import './App.css';
import Navbar from './Navbar';
import { ArticlesProvider } from './Contexts/CategoryArticlesContext.js'
import {SearchArticleProvider} from './Contexts/SearchArticlesContext.js'
import CategoryArticles from './CategoryArticles.js'
import SearchArticles from './SearchArticles.js'
import SearchBar from "./SearchBar.js";

function App() {
  return (
      <BrowserRouter>
        <SearchArticleProvider>
          <SearchBar />
          <ArticlesProvider>
            <Navbar/>
            <Switch>
              <Route exact path="/relatedTo/:q" render={() => <SearchArticles/>}/>
              <Route exact path="/:category" render={() => <CategoryArticles/> }/>
              <Route exact path="/" render={() => <CategoryArticles/>} />
            </Switch>
          </ArticlesProvider>
        </SearchArticleProvider>
      </BrowserRouter>
  )
}
export default App;
