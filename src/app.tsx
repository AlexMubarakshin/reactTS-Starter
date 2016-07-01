import * as React from "react";

export interface IAppProps { };
export interface IAppState { };


export class App extends React.Component<IAppProps, IAppState> {

    constructor(props: IAppProps) {
        super(props);
    }

    render() {
        return (
            <div>Hello world!!!</div>
        );
    }

}