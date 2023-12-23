import createCache from "@emotion/cache";
import { CacheProvider } from '@emotion/react';
import { ReactElement } from "react";

import { createTheme, ThemeProvider } from '@mui/material';
import * as React from 'react';
import { createRoot, Root } from 'react-dom/client';

export const renderMuiInShadowDom = (container: Element, initialChild: ReactElement) => {
    const shadowContainer = container.attachShadow({ mode: 'open' });
    const emotionRoot = document.createElement('style');
    const shadowRootElement = document.createElement('div');
    shadowContainer.appendChild(emotionRoot);
    shadowContainer.appendChild(shadowRootElement);

    const cache = createCache({
        key: 'css',
        prepend: true,
        container: emotionRoot,
    });
    const defaultTheme = createTheme({
        palette: {
            mode: 'dark',
        },
        components: {
            MuiPopover: {
              defaultProps: {
                container: shadowRootElement
              }
            },
            MuiPopper: {
              defaultProps: {
                container: shadowRootElement
              }
            },
            MuiModal: {
              defaultProps: {
                container: shadowRootElement
              }
            },
        }
    });

    let root = createRoot(shadowRootElement);
    
    const render = (child: ReactElement) => root.render(
        <CacheProvider value={cache}>
            <ThemeProvider theme={defaultTheme}>
                {child}
            </ThemeProvider>
        </CacheProvider>,
    );

    render(initialChild);

    return (newChild: ReactElement) => {
      root.unmount()
      root = createRoot(shadowRootElement);
      render(newChild)
    };
}
