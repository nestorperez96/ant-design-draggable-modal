import * as React from 'react'
import { useState } from 'react'
import { DraggableModalContext } from './DraggableModalContext'

export const DraggableModalProvider = ({ children }: { children: React.ReactNode }) => {
    // State is a map of id -> zIndex.
    // We run the risk of an overflow here, but that seems unlikely.
    const [maxZIndex, setMaxZIndex] = useState(0)
    const increment = () => setMaxZIndex(v => v + 1)
    const [state, setState] = useState({})
    const value = {
        state,
        maxZIndex,
        registerModal(id: string) {
            setState(state => ({
                ...state,
                [id]: maxZIndex,
            }))
            increment()
        },
        unregisterModal(id: string) {
            setState(state => {
                const clone = { ...state }
                delete clone[id]
                return clone
            })
        },
        bringToFront(id: string) {
            setState(state => ({
                ...state,
                [id]: maxZIndex,
            }))
            increment()
        },
    }
    return <DraggableModalContext.Provider value={value}>{children}</DraggableModalContext.Provider>
}
