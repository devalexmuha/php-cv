// The page layout: header on top, the current step in the middle, navigation at the bottom.
// Think of it as the main Blade layout (layouts/app.blade.php) with @yield('content').
import { AnimatePresence, MotionConfig } from 'motion/react';
import { steps, chapters } from './steps.js';
import { useStepNavigation } from './hooks/useStepNavigation.js';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation.js';
import Header from './components/layout/Header.jsx';
import StepScreen from './components/layout/StepScreen.jsx';
import StepNav from './components/layout/StepNav.jsx';

export default function App() {
    const navigation = useStepNavigation(steps);
    const { step, direction, next } = navigation;

    useKeyboardNavigation(navigation);

    return (
        // reducedMotion="user": no sliding animations for people who turned them off in their OS.
        <MotionConfig reducedMotion="user">
            <div className="flex h-dvh flex-col">
                <Header steps={steps} chapters={chapters} navigation={navigation} />

                <main className="relative flex-1 overflow-hidden">
                    {/* AnimatePresence lets the old step animate out while the new one animates in */}
                    <AnimatePresence initial={false} custom={direction}>
                        <StepScreen key={step.id} direction={direction} label={step.label}>
                            <step.Component {...step.props} onNext={next} />
                        </StepScreen>
                    </AnimatePresence>
                </main>

                <StepNav total={steps.length} navigation={navigation} />
            </div>
        </MotionConfig>
    );
}
