/**
 * An enum representing the accuracy of a zone.
 * Changing this affects how often the zone checks
 * every second.
 */
export interface AccuracyEnum {
	/** Defines low accuracy, checks every 1 second. */
	Low: { value: 1; additionalProperty: 1.0 };

	/** Defines medium accuracy, checks every 0.5 seconds. */
	Medium: { value: 2; additionalProperty: 0.5 };

	/** Defines high accuracy, checks every 0.1 seconds. */
	High: { value: 3; additionalProperty: 0.1 };

	/** Defines precise accuracy, checks every 0.01 seconds. */
	Precise: { value: 4; additionalProperty: 0.0 };
}
