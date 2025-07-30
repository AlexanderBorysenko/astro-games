/**
 * Composable for animating elements with random rotation and scale transformations
 */
export interface ElementAnimationConfig {
    /** Animation interval in milliseconds. Default: 400 */
    interval?: number;
    /** Rotation range in degrees. Default: { min: -10, max: 10 } */
    rotation?: {
        min: number;
        max: number;
    };
    /** Scale range. Default: { min: 0.8, max: 1.1 } */
    scale?: {
        min: number;
        max: number;
    };
    /** Base transform to preserve (e.g., existing rotation). Default: '' */
    baseTransform?: string;
}

export const useElementAnimation = (config: ElementAnimationConfig = {}) => {
    const {
        interval = 400,
        rotation = { min: -10, max: 10 },
        scale = { min: 0.8, max: 1.1 },
        baseTransform = ''
    } = config;

    const elementRef = ref<HTMLElement | null>(null);
    let animationInterval: NodeJS.Timeout | null = null;

    const getRandomRotation = () => {
        return Math.random() * (rotation.max - rotation.min) + rotation.min;
    };

    const getRandomScale = () => {
        return Math.random() * (scale.max - scale.min) + scale.min;
    };

    const animateElement = () => {
        if (elementRef.value) {
            const rotationValue = getRandomRotation();
            const scaleValue = getRandomScale();

            // Get any existing transform from CSS
            const computedStyle = window.getComputedStyle(elementRef.value);
            const existingTransform = computedStyle.transform;

            const transforms = [];

            // If there's a base transform, use it, otherwise check for existing CSS transform
            if (baseTransform) {
                transforms.push(baseTransform);
            } else if (existingTransform && existingTransform !== 'none') {
                // Only preserve the transform on first run to capture CSS-defined transforms
                if (!elementRef.value.dataset.hasAnimation) {
                    elementRef.value.dataset.originalTransform = existingTransform;
                    elementRef.value.dataset.hasAnimation = 'true';
                }
                if (elementRef.value.dataset.originalTransform && elementRef.value.dataset.originalTransform !== 'none') {
                    transforms.push(elementRef.value.dataset.originalTransform);
                }
            }

            transforms.push(`rotate(${rotationValue}deg)`);
            transforms.push(`scale(${scaleValue})`);

            const transform = transforms.join(' ');
            elementRef.value.style.transform = transform;
        }
    };

    const startAnimation = () => {
        if (animationInterval) {
            stopAnimation();
        }
        animationInterval = setInterval(animateElement, interval);
        // Initial animation call
        animateElement();
    };

    const stopAnimation = () => {
        if (animationInterval) {
            clearInterval(animationInterval);
            animationInterval = null;
        }
    };

    // Auto-start and cleanup
    onMounted(() => {
        startAnimation();
    });

    onUnmounted(() => {
        stopAnimation();
    });

    return {
        elementRef,
        startAnimation,
        stopAnimation,
        animateElement
    };
};
