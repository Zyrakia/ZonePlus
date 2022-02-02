export interface Signal<T extends Callback = () => void> {
	Connect(handler: T): RBXScriptConnection;
	Wait(): LuaTuple<Parameters<T>>;
}
