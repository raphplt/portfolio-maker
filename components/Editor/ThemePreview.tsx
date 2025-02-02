type ThemePreviewProps = {
	theme: {
		primaryColor: string;
		secondaryColor: string;
		backgroundColor: string;
		textColor: string;
	};
};

const ThemePreview = ({ theme }: ThemePreviewProps) => {
	return (
		<div className="flex gap-4">
			<div>
				<p>Couleur principale</p>
				<div
					style={{
						backgroundColor: theme.primaryColor,
						width: 50,
						height: 50,
						borderRadius: 4,
					}}
				/>
			</div>
			<div>
				<p>Couleur secondaire</p>
				<div
					style={{
						backgroundColor: theme.secondaryColor,
						width: 50,
						height: 50,
						borderRadius: 4,
					}}
				/>
			</div>
			<div>
				<p>Couleur de fond</p>
				<div
					style={{
						backgroundColor: theme.backgroundColor,
						width: 50,
						height: 50,
						borderRadius: 4,
					}}
				/>
			</div>
			<div>
				<p>Couleur du texte</p>
				<div
					style={{
						backgroundColor: theme.textColor,
						width: 50,
						height: 50,
						borderRadius: 4,
					}}
				/>
			</div>
		</div>
	);
};

export default ThemePreview;
