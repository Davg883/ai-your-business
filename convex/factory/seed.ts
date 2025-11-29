"use node";
import { action } from "../_generated/server";
import { internal } from "../_generated/api";

export const seedRegulations = action({
    args: {},
    handler: async (ctx) => {
        const puwerData = [
            {
                act_name: "PUWER 1998",
                section_title: "Regulation 4: Suitability of work equipment",
                content_text: "Every employer shall ensure that work equipment is so constructed or adapted as to be suitable for the purpose for which it is used or provided. In selecting work equipment, every employer shall have regard to the working conditions and to the risks to the health and safety of persons which exist in the premises or undertaking in which the work equipment is to be used and any additional risk posed by the use of that work equipment.",
                category: "Machinery",
            },
            {
                act_name: "PUWER 1998",
                section_title: "Regulation 12: Protection against specified hazards",
                content_text: "Every employer shall take measures to ensure that the exposure of a person using work equipment to any risk to his health or safety from any hazard specified in paragraph (3) is either prevented, or, where that is not reasonably practicable, adequately controlled. The measures required by paragraph (1) shall include the provision and use of a suitable guard or protection device.",
                category: "Safety",
            },
        ];

        for (const data of puwerData) {
            await ctx.runAction(internal.factory.ingest.ingestRegulation, data);
        }
    },
});
