import { Header } from '../components/landing/Header';
import { Hero } from '../components/landing/Hero';
import { Ecosystem } from '../components/landing/Ecosystem';
import { TaskStages } from '../components/landing/TaskStages';
import { Market } from '../components/landing/Market';
import { WhyJoin } from '../components/landing/WhyJoin';
import { Footer } from '../components/landing/Footer';

const Landing = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen overflow-x-hidden selection:bg-accent selection:text-black text-white">
            <Header />
            <main>
                <Hero />
                <Ecosystem />
                <TaskStages />
                <Market />
                <WhyJoin />
            </main>
            <Footer />
        </div>
    );
};

export default Landing;
