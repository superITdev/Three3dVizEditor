import * as THREE from 'three'
import { DraftSize, EditToolMode } from '../common'
import { editManager } from '../manager/editManager';
import RenderView, { RenderViewType } from '../manager/renderView'

export default class RenderView2d extends RenderView {
    editToolMode;
    editToolCmd = null;

    initialize() {
        const viewW = this.wViewWidth
        const viewH = this.wViewHeight

        // camera
        this.camera = new THREE.OrthographicCamera(-viewW / 2, viewW / 2, viewH / 2, -viewH / 2, 1, DraftSize)
        switch (this.viewType) {
            case RenderViewType.XY:
                this.camera.position.set(0, 0, DraftSize)
                this.camera.rotation.set(0, 0, 0)
                break;
            case RenderViewType.YZ:
                this.camera.position.set(DraftSize, 0, 0)
                this.camera.rotation.set(0, Math.PI / 2, 0)
                break;
            case RenderViewType.ZX:
                this.camera.position.set(0, DraftSize, 0)
                this.camera.rotation.set(-Math.PI / 2, 0, 0)
                break;
            default:
                console.warn('unhandled view type', this.viewType)
                break
        }

        super.initialize(this.camera)
    }

    onWindowResize = () => {
        const viewW = this.wViewWidth
        const viewH = this.wViewHeight

        this.camera.left = -viewW / 2
        this.camera.right = viewW / 2
        this.camera.top = viewH / 2
        this.camera.bottom = -viewH / 2
        this.camera.updateProjectionMatrix()

        this.renderer.setSize(viewW, viewH)

        this.render()
    }

    changeEditToolMode(editToolMode) {
        this.editToolMode = editToolMode
    }

    onMouseDown = (event) => {
        // console.log('onMouseDown', this.viewType, event)
        switch (this.editToolMode) {
            case EditToolMode.translateEntity.value: {
                const hit = editManager.hitEntity(this.raycaster)
                if (hit) {
                    this.editToolCmd = {
                        entity: hit.entity
                    }
                }
                break
            }
            default: {
                console.warn('onMouseDown: unhandled editToolMode', this.editToolMode)
                break
            }
        }
    }
    onMouseDrag = (event) => {
        // console.log('onMouseDrag', this.viewType, event)
        if (!this.editToolCmd) {
            return
        }
        switch (this.editToolMode) {
            case EditToolMode.translateEntity.value: {
                // const { entity } = this.editToolCmd
                switch (this.viewType) {
                    case RenderViewType.XY: {
                        break
                    }
                    default: {
                        console.warn('onMouseDrag: unhandled viewType', this.viewType)
                        break
                    }
                }
                break
            }
            default: {
                console.warn('onMouseDrag: unhandled editToolMode', this.editToolMode)
                break
            }
        }
    }
    onMouseUp = (event) => {
        // console.log('onMouseUp', this.viewType, event)
        this.editToolCmd = null
    }
}