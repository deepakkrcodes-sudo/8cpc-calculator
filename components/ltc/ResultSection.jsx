import EligibilityCard from "./cards/EligibilityCard";
import TimelineCard from "./cards/TimelineCard";
import TravelCard from "./cards/TravelCard";
import SuggestionCard from "./cards/SuggestionCard";
import PlannerCard from "./cards/PlannerCard";

export default function ResultSection({ result }) {
  return (
    <>
      {result && (
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <EligibilityCard data={result.eligibility} />
          
          <SuggestionCard data={result.suggestion} />
          <PlannerCard data={result.planner} />
        </div>
      )}
    </>
  );
}