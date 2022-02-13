export declare namespace Enum {
	export namespace Accuracy {
		/** Defines low accuracy, checks every 1 second. */
		export const Low: Low;
		type Low = { readonly _nominal_accuracy: unique symbol };

		/** Defines medium accuracy, checks every 0.5 seconds. */
		export const Medium: Medium;
		type Medium = { readonly _nominal_accuracy: unique symbol };

		/** Defines high accuracy, checks every 0.1 seconds. */
		export const High: High;
		type High = { readonly _nominal_accuracy: unique symbol };

		/** Defines precise accuracy, checks every 0.01 seconds. */
		export const Precise: Precise;
		type Precise = { readonly _nominal_accuracy: unique symbol };
	}

	/**
	 * An enum representing the accuracy of a zone.
	 * Changing this affects how often the zone checks
	 * every second.
	 */
	export type Accuracy = Accuracy.Low | Accuracy.Medium | Accuracy.High | Accuracy.Precise;

	export namespace Detection {
		/**
		 * Defines WholeBody accuracy, meaning multiple checks will
		 * be casted over an entire player's character.
		 */
		export const WholeBody: WholeBody;
		type WholeBody = { readonly _nominal_detection: unique symbol };

		/**
		 * Defines Centre accuracy, meaning a singular check will
		 * be performed on the player's HRP.
		 */
		export const Centre: Centre;
		type Centre = { readonly _nominal_detection: unique symbol };

		/**
		 * Defines Automatic accuracy, meaning the zone will
		 * dynamically switch between WholeBody and Centre based
		 * on the number of players on the server.
		 *
		 * This typically has no affect unless servers are running
		 * with 100+ players.
		 */
		export const Automatic: Automatic;
		type Automatic = { readonly _nominal_detection: unique symbol };
	}

	/**
	 * An enum representing the detection accuracy of a zone.
	 * Changing this affects what the zone considers to be
	 * inside or outside, this will only affect players and
	 * has no effect on regular parts.
	 */
	export type Detection = Detection.WholeBody | Detection.Centre | Detection.Automatic;
}
