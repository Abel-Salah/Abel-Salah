import { useMemo, useState } from "react";
import { ArrowRight, Clock3, Euro, Users } from "lucide-react";
import { Link } from "react-router";
import SEOHead from "@/components/SEOHead";
import { trackConversionEvent } from "@/lib/conversionEvents";

const formatEuro = (value: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);

const ManualWorkCalculator = () => {
  const [teamSize, setTeamSize] = useState(10);
  const [hoursPerWeek, setHoursPerWeek] = useState(6);
  const [hourlyCost, setHourlyCost] = useState(35);

  const estimate = useMemo(() => {
    const annualHours = teamSize * hoursPerWeek * 52;
    const annualCost = annualHours * hourlyCost;
    return { annualHours, annualCost, workdays: Math.round(annualHours / 7) };
  }, [teamSize, hoursPerWeek, hourlyCost]);

  return (
    <main className="min-h-screen bg-background px-4 pb-24 pt-32 text-foreground md:px-8">
      <SEOHead
        title="Estimer le coût des tâches manuelles | Abel SALAH"
        description="Estimez le coût annuel du travail manuel répétitif dans votre entreprise et identifiez les premiers axes d’automatisation IA."
        canonical="/outils/calculateur-taches-manuelles"
        lang="fr"
        breadcrumbs={[{ name: "Calculateur de tâches manuelles", path: "/outils/calculateur-taches-manuelles" }]}
      />

      <section className="mx-auto max-w-6xl">
        <div className="max-w-4xl">
          <p className="mb-6 text-xs uppercase tracking-[0.28em] text-primary">Outil gratuit · estimation indicative</p>
          <h1 className="heading-display text-5xl leading-[0.9] md:text-8xl">
            Combien vous coûtent les tâches manuelles ?
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Une première estimation pour rendre visible le temps mobilisé par les tâches répétitives. Ce résultat est un repère, pas une promesse d’économie.
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-start">
          <div className="space-y-8 border-y border-border py-8">
            <SliderField icon={<Users className="h-5 w-5" />} label="Personnes concernées" value={teamSize} min={1} max={100} suffix=" personnes" onChange={setTeamSize} />
            <SliderField icon={<Clock3 className="h-5 w-5" />} label="Heures par personne / semaine" value={hoursPerWeek} min={1} max={40} suffix=" h" onChange={setHoursPerWeek} />
            <SliderField icon={<Euro className="h-5 w-5" />} label="Coût horaire chargé estimé" value={hourlyCost} min={15} max={150} suffix=" €" onChange={setHourlyCost} />
          </div>

          <aside className="rounded-2xl border border-primary/30 bg-primary/5 p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Repère annuel</p>
            <p className="mt-5 text-6xl font-extrabold tracking-tight text-primary md:text-7xl">{formatEuro(estimate.annualCost)}</p>
            <p className="mt-3 text-muted-foreground">de temps mobilisé selon vos hypothèses</p>
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6 text-sm">
              <div><strong className="block text-2xl text-foreground">{estimate.annualHours.toLocaleString("fr-FR")} h</strong><span className="text-muted-foreground">par an</span></div>
              <div><strong className="block text-2xl text-foreground">{estimate.workdays}</strong><span className="text-muted-foreground">jours de travail</span></div>
            </div>
            <Link
              to="/contact?subject=Estimation%20taches%20manuelles"
              onClick={() => trackConversionEvent("offer_cta_click", "manual_work_calculator", "/contact")}
              className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary px-6 py-4 font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              Recevoir une analyse personnalisée <ArrowRight className="h-5 w-5" />
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
};

function SliderField({ icon, label, value, min, max, suffix, onChange }: { icon: React.ReactNode; label: string; value: number; min: number; max: number; suffix: string; onChange: (value: number) => void }) {
  return (
    <label className="block">
      <span className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">{icon}{label}<span className="ml-auto rounded-md border border-border px-3 py-2 text-base font-semibold normal-case tracking-normal text-foreground">{value}{suffix}</span></span>
      <input aria-label={label} type="range" min={min} max={max} value={value} onChange={(event) => onChange(Number(event.target.value))} className="h-2 w-full cursor-pointer accent-primary" />
    </label>
  );
}

export default ManualWorkCalculator;
