import mongoose from "mongoose";

type DBInput = {
    db: string;
};

export default ({ db }: DBInput): void => {
    const connect = () => {
        mongoose
            .connect(db, { useNewUrlParser: true })
            // eslint-disable-next-line arrow-body-style
            .then(() => {
                // eslint-disable-next-line
                return console.info(`Successfully connected to ${db}`);
            })
            .catch((err) => {
                // eslint-disable-next-line
                console.error(`Error connecting to database :`, err);

                return process.exit(1);
            });
    };

    connect();

    mongoose.connection.on("disconnected", connect);
};
