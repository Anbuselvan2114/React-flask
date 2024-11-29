from multiprocessing import Process
import os

def run_service(service_path):
    os.system(f"python {service_path}")

# List of services
services = [
    "microservices/auth_service/app.py",
    "microservices/upload_service/app.py"
]
if __name__ == "__main__":
    processes = []

    try:
        # Start each service in a separate process
        for service in services:
            process = Process(target=run_service, args=(service,))
            process.start()
            processes.append(process)

        print("All services are running...")

        # Keep the main script running
        for process in processes:
            process.join()

    except KeyboardInterrupt:
        print("Shutting down services...")
        for process in processes:
            process.terminate()
            process.join()
