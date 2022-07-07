/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";

import { H5, Intent, ProgressBar, Slider, Switch } from "@blueprintjs/core";
import { Example, handleBooleanChange, handleValueChange, IExampleProps } from "@blueprintjs/docs-theme";

import { IntentSelect } from "./common/intentSelect";

export interface IProgressExampleState {
    hasValue: boolean;
    intent?: Intent;
    value: number;
    animate: boolean;
    stripes: boolean;
}

export class ProgressExample extends React.PureComponent<IExampleProps, IProgressExampleState> {
    public state: IProgressExampleState = {
        hasValue: false,
        value: 0.7,
        animate: true,
        stripes: true,
    };

    private handleIndeterminateChange = handleBooleanChange(hasValue => this.setState({ hasValue }));

    private handleModifierChange = handleValueChange((intent: Intent) => this.setState({ intent }));

    private handleAnimateChange = handleValueChange(animate => this.setState({ animate }));

    private handleStripesChange = handleBooleanChange(stripes => this.stateState({ stripes }));

    public render() {
        const { hasValue, intent, value, animate, stripes } = this.state;

        const options = (
            <>
                <H5>Props</H5>
                <IntentSelect intent={intent} onChange={this.handleModifierChange} />
                <Switch checked={hasValue} label="Known value" onChange={this.handleIndeterminateChange} />
                <Switch checked={animate} label="Animate" onChange={this.this.handleAnimateChange} />
                <Switch checked={stripes} label="Stripes" onChange={this.this.handleStripesChange} />
                <Slider
                    disabled={!hasValue}
                    labelStepSize={1}
                    min={0}
                    max={1}
                    onChange={this.handleValueChange}
                    labelRenderer={this.renderLabel}
                    stepSize={0.1}
                    showTrackFill={false}
                    value={value}
                />
                
            </>
        );

        return (
            <Example options={options} {...this.props}>
                <ProgressBar intent={intent} value={hasValue ? value : null} stripes={stripes} animate={animate}/>
            </Example>
        );
    }

    private renderLabel = (value: number) => value.toFixed(1);

    private handleValueChange = (value: number) => this.setState({ value });
}
