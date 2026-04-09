import { Card, CardBody, Button, Chip } from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faArrowRight, faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function AIInterviewBanner() {
    return (
        <Card className="border-none shadow-xl bg-gradient-to-br from-primary-600 to-primary-800 text-white overflow-hidden rounded-[2rem] relative group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <FontAwesomeIcon icon={faRobot} className="text-8xl -mr-8 -mt-8" />
            </div>

            <CardBody className="p-8 space-y-6 relative">
                <div className="flex justify-between items-start">
                    <Chip
                        variant="flat"
                        size="sm"
                        className="bg-white/20 text-white border-none font-bold uppercase tracking-wider text-[10px]"
                        startContent={<FontAwesomeIcon icon={faWandMagicSparkles} className="text-[10px]" />}
                    >
                        New Feature
                    </Chip>
                </div>

                <div className="space-y-2">
                    <h3 className="text-2xl font-black leading-tight">
                        Ace Your Next <br /> Tech Interview
                    </h3>
                    <p className="text-primary-100 text-sm font-medium opacity-90">
                        Practice with our AI behavioral expert and get instant feedback.
                    </p>
                </div>

                <Button
                    as={Link}
                    to="/ai-interview"
                    className="w-full bg-white text-primary-600 font-extrabold h-12 rounded-xl shadow-lg hover:bg-primary-50 active:scale-95 transition-all"
                    endContent={<FontAwesomeIcon icon={faArrowRight} />}
                >
                    Try AI Mock Interview
                </Button>
            </CardBody>
        </Card>
    );
}
