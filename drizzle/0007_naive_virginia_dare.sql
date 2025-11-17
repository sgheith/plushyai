CREATE TABLE "plushie_generations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"original_image_url" text NOT NULL,
	"plushie_image_url" text NOT NULL,
	"subject_type" text NOT NULL,
	"status" text DEFAULT 'processing' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "plushie_generations" ADD CONSTRAINT "plushie_generations_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "plushie_generations_user_id_idx" ON "plushie_generations" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "plushie_generations_created_at_idx" ON "plushie_generations" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "plushie_generations_user_created_idx" ON "plushie_generations" USING btree ("user_id","created_at");