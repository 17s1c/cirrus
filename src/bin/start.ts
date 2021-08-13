import { container } from '../inversify.config';
import { Application } from '../interfaces/Application';

const app = container.get<Application>(Application);
app.start();
