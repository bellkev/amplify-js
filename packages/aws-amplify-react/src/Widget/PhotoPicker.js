/*
 * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */

import React, { Component } from 'react';

import { I18n, ConsoleLogger as Logger } from '@aws-amplify/core';
import Picker from './Picker';
import AmplifyTheme from '../Amplify-UI/Amplify-UI-Theme';
import { FormSection, SectionHeader, SectionBody, PhotoPlaceholder } from '../Amplify-UI/Amplify-UI-Components-React';


const PickerPreview = {
    maxWidth: '100%'
}

const logger = new Logger('PhotoPicker');

export default class PhotoPicker extends Component {
    constructor(props) {
        super(props);

        this.handlePick = this.handlePick.bind(this);

        this.state = {
            previewSrc: props.previewSrc
        };
    }

    handlePick(data) {
        var that = this;
        const { file, name, size, type } = data;
        const { preview, onPick, onLoad } = this.props;

        if (onPick) { onPick(data); }

        if (preview) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const url = e.target.result;
                that.setState({ previewSrc: url });
                if (onLoad) { onLoad(url); }
            }
            reader.readAsDataURL(file);
        }
    }

    render() {
        const { preview } = this.props;
        const { previewSrc } = this.state;

        const headerText = this.props.headerText || 'Photos';
        const headerHint = this.props.headerHint || 'Add you photos by clicking below'
        const title = this.props.title || 'Select a Photo';

        const theme = this.props.theme || AmplifyTheme;
        const containerStyle = Object.assign({}, Picker, theme.picker);
        const previewStyle = Object.assign(
            {},
            PickerPreview,
            theme.pickerPreview,
            (preview && preview !== 'hidden')? {} : AmplifyTheme.hidden
        );

        return (
            <FormSection theme={theme}>
                <SectionHeader theme={theme} hint={headerHint}>{I18n.get(headerText)}</SectionHeader>
                <SectionBody>
                    { previewSrc ?
                        <img src={previewSrc} style={previewStyle} /> : 
                        <PhotoPlaceholder />
                    }
                </SectionBody>
                <Picker
                    title={title}
                    accept="image/*"
                    theme={theme}
                    onPick={this.handlePick}
                />
            </FormSection>
        )
    }
}
