CREATE TABLE "sprendimai" (
	"id" serial PRIMARY KEY NOT NULL,
	"eil_nr" integer NOT NULL,
	"rusis" text NOT NULL,
	"pavadinimas" text NOT NULL,
	"istaigos_nr" text NOT NULL,
	"priemimo_data" date NOT NULL,
	"isigaliojimo_data" date NOT NULL,
	"projektai_nuoroda" text,
	"scraped_at" timestamp,
	"ai_risk_score" numeric,
	"ai_summary" text
);
