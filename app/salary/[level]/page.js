import SalaryCalculator from "@/components/calculator/SalaryCalculator";

export default function SalaryLevelPage({ params }) {

  const level = params.level;

  return (

    <div>

      <h1 className="text-xl font-semibold mb-3">
        8th CPC Salary Calculator Level {level}
      </h1>

      <SalaryCalculator defaultLevel={level} />

    </div>

  );

}

export async function generateMetadata({ params }) {

  const level = params.level;

  return {

    title: `8th CPC Salary Calculator Level ${level}`,

    description:
      `Calculate expected 8th Pay Commission salary for pay level ${level}.`

  };

}