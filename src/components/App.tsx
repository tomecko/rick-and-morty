import React from "react";
import { Link, Redirect, Route, Switch } from "wouter";

import { Character } from "./character/Character";
import { Characters } from "./characters/Characters";

import styles from "./App.module.scss";

export function App() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>
          <Link href="/" title="go to Home Page">Rick and Morty</Link>
        </h1>
      </header>
      <main className={styles.main}>
        <Switch>
          <Route path="/">{() => <Characters />}</Route>
          <Route path="/page/:page">
            {(params) => <Characters page={Number(params.page)} />}
          </Route>
          <Route path="/character/:id">
            {(params) => <Character id={params.id} />}
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </div>
  );
}
