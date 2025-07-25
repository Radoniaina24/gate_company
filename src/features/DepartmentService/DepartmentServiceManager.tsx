"use client";
import React, { useState, useMemo, useCallback } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Building,
  Users,
  Search,
  X,
  Zap,
} from "lucide-react";

// Types et interfaces
interface Department {
  id: number;
  name: string;
  description: string;
  manager: string;
  createdAt: string;
}

interface Service {
  id: number;
  name: string;
  description: string;
  manager: string;
  departmentId: number;
  createdAt: string;
}

interface FormData {
  name: string;
  description: string;
  manager: string;
  departmentId?: number;
}

type TabType = "departments" | "services";
type EntityType = "department" | "service";
type ModalMode = "add" | "edit";

// Données initiales (dans un vrai projet, ces données viendraient d'une API)
const INITIAL_DEPARTMENTS: Department[] = [
  {
    id: 1,
    name: "Ressources Humaines",
    description: "Gestion du personnel et recrutement",
    manager: "Marie Dubois",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Informatique",
    description: "Support technique et développement",
    manager: "Jean Martin",
    createdAt: "2024-01-10",
  },
  {
    id: 3,
    name: "Marketing Digital",
    description: "Stratégie digitale et communication",
    manager: "Sarah Wilson",
    createdAt: "2024-01-20",
  },
];

const INITIAL_SERVICES: Service[] = [
  {
    id: 1,
    name: "Recrutement",
    description: "Processus de sélection des candidats",
    manager: "Sophie Laurent",
    departmentId: 1,
    createdAt: "2024-01-16",
  },
  {
    id: 2,
    name: "Formation",
    description: "Développement des compétences",
    manager: "Pierre Durand",
    departmentId: 1,
    createdAt: "2024-01-17",
  },
  {
    id: 3,
    name: "Support Technique",
    description: "Assistance utilisateurs",
    manager: "Alex Bernard",
    departmentId: 2,
    createdAt: "2024-01-12",
  },
  {
    id: 4,
    name: "SEO & Analytics",
    description: "Optimisation et analyse",
    manager: "Emma Chen",
    departmentId: 3,
    createdAt: "2024-01-22",
  },
];

// Hook personnalisé pour la gestion des entités
const useEntityManager = () => {
  const [departments, setDepartments] =
    useState<Department[]>(INITIAL_DEPARTMENTS);
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);

  const addDepartment = useCallback(
    (data: Omit<Department, "id" | "createdAt">) => {
      const newDepartment: Department = {
        id: Math.max(...departments.map((d) => d.id), 0) + 1,
        ...data,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setDepartments((prev) => [...prev, newDepartment]);
    },
    [departments]
  );

  const updateDepartment = useCallback(
    (id: number, data: Partial<Department>) => {
      setDepartments((prev) =>
        prev.map((dept) => (dept.id === id ? { ...dept, ...data } : dept))
      );
    },
    []
  );

  const deleteDepartment = useCallback((id: number) => {
    setDepartments((prev) => prev.filter((dept) => dept.id !== id));
    setServices((prev) =>
      prev.filter((service) => service.departmentId !== id)
    );
  }, []);

  const addService = useCallback(
    (data: Omit<Service, "id" | "createdAt">) => {
      const newService: Service = {
        id: Math.max(...services.map((s) => s.id), 0) + 1,
        ...data,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setServices((prev) => [...prev, newService]);
    },
    [services]
  );

  const updateService = useCallback((id: number, data: Partial<Service>) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === id ? { ...service, ...data } : service
      )
    );
  }, []);

  const deleteService = useCallback((id: number) => {
    setServices((prev) => prev.filter((service) => service.id !== id));
  }, []);

  const getDepartmentName = useCallback(
    (id: number) => {
      return (
        departments.find((d) => d.id === id)?.name || "Département inconnu"
      );
    },
    [departments]
  );

  const getServicesCountByDepartment = useCallback(
    (departmentId: number) => {
      return services.filter((service) => service.departmentId === departmentId)
        .length;
    },
    [services]
  );

  return {
    departments,
    services,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    addService,
    updateService,
    deleteService,
    getDepartmentName,
    getServicesCountByDepartment,
  };
};

// Hook pour les filtres
const useFilters = (departments: Department[], services: Service[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(
    null
  );

  const filteredDepartments = useMemo(() => {
    return departments.filter(
      (dept) =>
        dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.manager.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [departments, searchTerm]);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch =
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.manager.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDepartment = selectedDepartment
        ? service.departmentId === selectedDepartment
        : true;

      return matchesSearch && matchesDepartment;
    });
  }, [services, searchTerm, selectedDepartment]);

  return {
    searchTerm,
    setSearchTerm,
    selectedDepartment,
    setSelectedDepartment,
    filteredDepartments,
    filteredServices,
  };
};

// Hook pour la gestion du modal
const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<EntityType>("department");
  const [mode, setMode] = useState<ModalMode>("add");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    manager: "",
    departmentId: undefined,
  });

  const resetForm = useCallback(() => {
    setFormData({
      name: "",
      description: "",
      manager: "",
      departmentId: undefined,
    });
  }, []);

  const openModal = useCallback(
    (
      entityType: EntityType,
      modalMode: ModalMode,
      id?: number,
      initialData?: Partial<FormData>
    ) => {
      setType(entityType);
      setMode(modalMode);
      setEditingId(id || null);

      if (initialData) {
        setFormData((prev) => ({ ...prev, ...initialData }));
      } else {
        resetForm();
      }

      setIsOpen(true);
    },
    [resetForm]
  );

  const closeModal = useCallback(() => {
    setIsOpen(false);
    resetForm();
    setEditingId(null);
  }, [resetForm]);

  return {
    isOpen,
    type,
    mode,
    editingId,
    formData,
    setFormData,
    openModal,
    closeModal,
  };
};

// Composant pour les onglets
const TabNavigation: React.FC<{
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  departmentsCount: number;
  servicesCount: number;
}> = ({ activeTab, setActiveTab, departmentsCount, servicesCount }) => (
  <div className="relative bg-white/90 backdrop-blur-xl border border-red-200 rounded-2xl shadow-2xl overflow-hidden">
    <div className="flex">
      <TabButton
        isActive={activeTab === "departments"}
        onClick={() => setActiveTab("departments")}
        icon={<Building className="w-6 h-6" />}
        label="Départements"
        count={departmentsCount}
      />
      <TabButton
        isActive={activeTab === "services"}
        onClick={() => setActiveTab("services")}
        icon={<Users className="w-6 h-6" />}
        label="Services"
        count={servicesCount}
      />
    </div>
  </div>
);

const TabButton: React.FC<{
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  count: number;
}> = ({ isActive, onClick, icon, label, count }) => (
  <button
    onClick={onClick}
    className={`flex-1 py-6 px-8 font-semibold text-md transition-all duration-300 relative group ${
      isActive ? "text-white" : "text-gray-600 hover:text-gray-800"
    }`}
  >
    {isActive && (
      <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 opacity-90"></div>
    )}
    <div className="relative flex items-center justify-center space-x-3">
      {icon}
      <span>{label}</span>
      <div
        className={`px-2 py-1 rounded-full text-sm ${
          isActive ? "bg-white/20" : "bg-red-100 text-red-600"
        }`}
      >
        {count}
      </div>
    </div>
  </button>
);

// Composant pour les contrôles (recherche, filtres, bouton d'ajout)
const Controls: React.FC<{
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedDepartment: number | null;
  setSelectedDepartment: (id: number | null) => void;
  departments: Department[];
  activeTab: TabType;
  onAdd: () => void;
}> = ({
  searchTerm,
  setSearchTerm,
  selectedDepartment,
  setSelectedDepartment,
  departments,
  activeTab,
  onAdd,
}) => (
  <div className="border-t border-red-200 p-6">
    <div className="flex flex-col lg:flex-row gap-4">
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {activeTab === "services" && (
        <DepartmentFilter
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={setSelectedDepartment}
          departments={departments}
        />
      )}
      <AddButton activeTab={activeTab} onAdd={onAdd} />
    </div>
  </div>
);

const SearchInput: React.FC<{
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}> = ({ searchTerm, setSearchTerm }) => (
  <div className="flex-1 relative group">
    <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-amber-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div className="relative bg-white/70 backdrop-blur-sm border border-red-200 rounded-xl overflow-hidden">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
      <input
        type="text"
        placeholder="Rechercher par nom, description ou responsable..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-12 pr-4 py-4 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none"
      />
    </div>
  </div>
);

const DepartmentFilter: React.FC<{
  selectedDepartment: number | null;
  setSelectedDepartment: (id: number | null) => void;
  departments: Department[];
}> = ({ selectedDepartment, setSelectedDepartment, departments }) => (
  <div className="relative group">
    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-red-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <select
      value={selectedDepartment || ""}
      onChange={(e) =>
        setSelectedDepartment(e.target.value ? parseInt(e.target.value) : null)
      }
      className="relative bg-white/70 backdrop-blur-sm border border-red-200 rounded-xl px-4 py-4 text-gray-800 focus:outline-none appearance-none min-w-48"
    >
      <option value="">Tous les départements</option>
      {departments.map((dept) => (
        <option key={dept.id} value={dept.id}>
          {dept.name}
        </option>
      ))}
    </select>
  </div>
);

const AddButton: React.FC<{
  activeTab: TabType;
  onAdd: () => void;
}> = ({ activeTab, onAdd }) => (
  <button
    onClick={onAdd}
    className="relative group overflow-hidden bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div className="relative flex items-center space-x-2">
      <Plus className="w-5 h-5" />
      <span>
        Ajouter {activeTab === "departments" ? "département" : "service"}
      </span>
    </div>
  </button>
);

// Composant pour les cartes de départements
const DepartmentCard: React.FC<{
  department: Department;
  servicesCount: number;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  index: number;
}> = ({ department, servicesCount, onEdit, onDelete, index }) => (
  <div
    className="group relative transform transition-all duration-500 hover:scale-105"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-amber-500 rounded-2xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-300"></div>
    <div className="relative bg-white/95 backdrop-blur-xl border border-red-200 rounded-2xl p-6 shadow-2xl hover:shadow-red-500/25 transition-all duration-300">
      <CardHeader
        icon={<Building className="w-6 h-6 text-white" />}
        title={department.name}
        onEdit={() => onEdit(department.id)}
        onDelete={() => onDelete(department.id)}
        gradient="from-red-400 to-red-600"
      />
      <p className="text-gray-700 mb-6 leading-relaxed">
        {department.description}
      </p>
      <CardInfo
        items={[
          {
            label: "Responsable:",
            value: department.manager,
            color: "from-red-400 to-red-600",
          },
          {
            label: "Services:",
            value: servicesCount.toString(),
            color: "from-amber-400 to-amber-600",
          },
          {
            label: "Créé le:",
            value: new Date(department.createdAt).toLocaleDateString("fr-FR"),
            color: "from-gray-400 to-gray-600",
          },
        ]}
      />
    </div>
  </div>
);

// Composant pour les cartes de services
const ServiceCard: React.FC<{
  service: Service;
  departmentName: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  index: number;
}> = ({ service, departmentName, onEdit, onDelete, index }) => (
  <div
    className="group relative transform transition-all duration-500 hover:scale-105"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-red-500 rounded-2xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-300"></div>
    <div className="relative bg-white/95 backdrop-blur-xl border border-red-200 rounded-2xl p-6 shadow-2xl hover:shadow-amber-500/25 transition-all duration-300">
      <CardHeader
        icon={<Users className="w-6 h-6 text-white" />}
        title={service.name}
        onEdit={() => onEdit(service.id)}
        onDelete={() => onDelete(service.id)}
        gradient="from-amber-400 to-amber-600"
      />
      <p className="text-gray-700 mb-6 leading-relaxed">
        {service.description}
      </p>
      <CardInfo
        items={[
          {
            label: "Responsable:",
            value: service.manager,
            color: "from-red-400 to-red-600",
          },
          {
            label: "Département:",
            value: departmentName,
            color: "from-amber-400 to-amber-600",
          },
          {
            label: "Créé le:",
            value: new Date(service.createdAt).toLocaleDateString("fr-FR"),
            color: "from-gray-400 to-gray-600",
          },
        ]}
      />
    </div>
  </div>
);

// Composants communs pour les cartes
const CardHeader: React.FC<{
  icon: React.ReactNode;
  title: string;
  onEdit: () => void;
  onDelete: () => void;
  gradient: string;
}> = ({ icon, title, onEdit, onDelete, gradient }) => (
  <div className="flex justify-between items-start mb-6">
    <div className="flex items-center space-x-3">
      <div className="relative">
        <div
          className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-xl opacity-20 blur`}
        ></div>
        <div className={`relative bg-gradient-to-r ${gradient} p-3 rounded-xl`}>
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
    </div>
    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <button
        onClick={onEdit}
        className="p-2 bg-gray-100 hover:bg-blue-50 rounded-lg transition-colors duration-300"
      >
        <Edit className="w-4 h-4 text-gray-600 hover:text-blue-600" />
      </button>
      <button
        onClick={onDelete}
        className="p-2 bg-gray-100 hover:bg-red-50 rounded-lg transition-colors duration-300"
      >
        <Trash2 className="w-4 h-4 text-gray-600 hover:text-red-600" />
      </button>
    </div>
  </div>
);

const CardInfo: React.FC<{
  items: Array<{ label: string; value: string; color: string }>;
}> = ({ items }) => (
  <div className="space-y-3">
    {items.map((item, index) => (
      <div key={index} className="flex items-center space-x-3">
        <div
          className={`w-2 h-2 bg-gradient-to-r ${item.color} rounded-full`}
        ></div>
        <span className="text-sm text-gray-500">{item.label}</span>
        <span className="text-sm text-gray-800 font-medium">{item.value}</span>
      </div>
    ))}
  </div>
);

// Composant pour l'état vide
const EmptyState: React.FC<{
  activeTab: TabType;
  searchTerm: string;
}> = ({ activeTab, searchTerm }) => (
  <div className="text-center py-20">
    <div className="relative inline-block mb-6">
      <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-amber-500 rounded-full opacity-20 blur-xl"></div>
      <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-full border border-red-200">
        {activeTab === "departments" ? (
          <Building className="w-16 h-16 text-gray-500 mx-auto" />
        ) : (
          <Users className="w-16 h-16 text-gray-500 mx-auto" />
        )}
      </div>
    </div>
    <h3 className="text-2xl font-bold text-gray-800 mb-2">
      {searchTerm
        ? "Aucun résultat trouvé"
        : `Aucun ${
            activeTab === "departments" ? "département" : "service"
          } disponible`}
    </h3>
    <p className="text-gray-600">
      {searchTerm
        ? "Essayez de modifier vos critères de recherche"
        : `Commencez par ajouter votre premier ${
            activeTab === "departments" ? "département" : "service"
          }`}
    </p>
  </div>
);

// Composant pour le modal
const Modal: React.FC<{
  isOpen: boolean;
  type: EntityType;
  mode: ModalMode;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  departments: Department[];
  onClose: () => void;
  onSubmit: () => void;
}> = ({
  isOpen,
  type,
  mode,
  formData,
  setFormData,
  departments,
  onClose,
  onSubmit,
}) => {
  if (!isOpen) return null;

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="relative max-w-md w-full">
        <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-amber-500 rounded-3xl opacity-30 blur"></div>
        <div className="relative bg-white/95 backdrop-blur-xl border border-red-200 rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
          <ModalHeader type={type} mode={mode} onClose={onClose} />
          <ModalForm
            type={type}
            formData={formData}
            departments={departments}
            onInputChange={handleInputChange}
          />
          <ModalActions mode={mode} onClose={onClose} onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};

const ModalHeader: React.FC<{
  type: EntityType;
  mode: ModalMode;
  onClose: () => void;
}> = ({ type, mode, onClose }) => (
  <div className="relative p-8 border-b border-red-200">
    <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-amber-50"></div>
    <div className="relative flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 rounded-xl opacity-20 blur"></div>
          <div className="relative bg-gradient-to-r from-red-500 to-red-700 p-3 rounded-xl">
            {type === "department" ? (
              <Building className="w-6 h-6 text-white" />
            ) : (
              <Users className="w-6 h-6 text-white" />
            )}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {mode === "add" ? "Créer" : "Modifier"}
          </h2>
          <p className="text-gray-600">
            {type === "department" ? "un département" : "un service"}
          </p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="p-2 bg-gray-100 hover:bg-red-50 rounded-xl transition-colors duration-300 group"
      >
        <X className="w-6 h-6 text-gray-600 group-hover:text-red-600" />
      </button>
    </div>
  </div>
);

const ModalForm: React.FC<{
  type: EntityType;
  formData: FormData;
  departments: Department[];
  onInputChange: (field: keyof FormData, value: string | number) => void;
}> = ({ type, formData, departments, onInputChange }) => (
  <div className="p-8 space-y-6">
    <FormField
      label={`Nom ${type === "department" ? "du département" : "du service"}`}
      placeholder={`Nom ${
        type === "department" ? "du département" : "du service"
      }`}
      value={formData.name}
      onChange={(value) => onInputChange("name", value)}
      required
    />

    <FormField
      label="Description"
      placeholder="Description détaillée..."
      value={formData.description}
      onChange={(value) => onInputChange("description", value)}
      multiline
      required
    />

    <FormField
      label="Responsable"
      placeholder="Nom du responsable"
      value={formData.manager}
      onChange={(value) => onInputChange("manager", value)}
      required
    />

    {type === "service" && (
      <SelectField
        label="Département parent"
        value={formData.departmentId || ""}
        onChange={(value) => onInputChange("departmentId", parseInt(value))}
        options={[
          { value: "", label: "Sélectionnez un département" },
          ...departments.map((dept) => ({
            value: dept.id.toString(),
            label: dept.name,
          })),
        ]}
        required
      />
    )}
  </div>
);

const FormField: React.FC<{
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  required?: boolean;
}> = ({
  label,
  placeholder,
  value,
  onChange,
  multiline = false,
  required = false,
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-semibold text-gray-800">{label}</label>
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-amber-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      {multiline ? (
        <textarea
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="relative w-full px-4 py-4 bg-white/70 backdrop-blur-sm border border-red-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors duration-300 resize-none"
          placeholder={placeholder}
        />
      ) : (
        <input
          type="text"
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="relative w-full px-4 py-4 bg-white/70 backdrop-blur-sm border border-red-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors duration-300"
          placeholder={placeholder}
        />
      )}
    </div>
  </div>
);

const SelectField: React.FC<{
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  required?: boolean;
}> = ({ label, value, onChange, options, required = false }) => (
  <div className="space-y-2">
    <label className="block text-sm font-semibold text-gray-800">{label}</label>
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-red-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <select
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="relative w-full px-4 py-4 bg-white/70 backdrop-blur-sm border border-red-200 rounded-xl text-gray-800 focus:outline-none focus:border-red-500 transition-colors duration-300 appearance-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  </div>
);

const ModalActions: React.FC<{
  mode: ModalMode;
  onClose: () => void;
  onSubmit: () => void;
}> = ({ mode, onClose, onSubmit }) => (
  <div className="flex space-x-4 pt-6 p-8">
    <button
      type="button"
      onClick={onClose}
      className="flex-1 px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-300 border border-gray-200"
    >
      Annuler
    </button>
    <button
      type="button"
      onClick={onSubmit}
      className="flex-1 relative overflow-hidden bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative flex items-center justify-center space-x-2">
        <Zap className="w-5 h-5" />
        <span>{mode === "add" ? "Créer" : "Modifier"}</span>
      </div>
    </button>
  </div>
);

// Composant principal
const DepartmentServiceManager = () => {
  const [activeTab, setActiveTab] = useState<TabType>("departments");

  const {
    departments,
    services,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    addService,
    updateService,
    deleteService,
    getDepartmentName,
    getServicesCountByDepartment,
  } = useEntityManager();

  const {
    searchTerm,
    setSearchTerm,
    selectedDepartment,
    setSelectedDepartment,
    filteredDepartments,
    filteredServices,
  } = useFilters(departments, services);

  const {
    isOpen: isModalOpen,
    type: modalType,
    mode: modalMode,
    editingId,
    formData,
    setFormData,
    openModal,
    closeModal,
  } = useModal();

  // Gestionnaires d'événements
  const handleAdd = useCallback(() => {
    const entityType = activeTab === "departments" ? "department" : "service";
    openModal(entityType, "add");
  }, [activeTab, openModal]);

  const handleEdit = useCallback(
    (type: EntityType, id: number) => {
      if (type === "department") {
        const dept = departments.find((d) => d.id === id);
        if (dept) {
          openModal("department", "edit", id, {
            name: dept.name,
            description: dept.description,
            manager: dept.manager,
          });
        }
      } else {
        const service = services.find((s) => s.id === id);
        if (service) {
          openModal("service", "edit", id, {
            name: service.name,
            description: service.description,
            manager: service.manager,
            departmentId: service.departmentId,
          });
        }
      }
    },
    [departments, services, openModal]
  );

  const handleDelete = useCallback(
    (type: EntityType, id: number) => {
      if (window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) {
        if (type === "department") {
          deleteDepartment(id);
        } else {
          deleteService(id);
        }
      }
    },
    [deleteDepartment, deleteService]
  );

  const handleSubmit = useCallback(() => {
    if (!formData.name || !formData.description || !formData.manager) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (modalType === "service" && !formData.departmentId) {
      alert("Veuillez sélectionner un département");
      return;
    }

    if (modalType === "department") {
      if (modalMode === "add") {
        addDepartment({
          name: formData.name,
          description: formData.description,
          manager: formData.manager,
        });
      } else if (editingId) {
        updateDepartment(editingId, {
          name: formData.name,
          description: formData.description,
          manager: formData.manager,
        });
      }
    } else {
      if (modalMode === "add") {
        addService({
          name: formData.name,
          description: formData.description,
          manager: formData.manager,
          departmentId: formData.departmentId!,
        });
      } else if (editingId) {
        updateService(editingId, {
          name: formData.name,
          description: formData.description,
          manager: formData.manager,
          departmentId: formData.departmentId!,
        });
      }
    }

    closeModal();
  }, [
    formData,
    modalType,
    modalMode,
    editingId,
    addDepartment,
    updateDepartment,
    addService,
    updateService,
    closeModal,
  ]);

  // Données à afficher
  const currentData =
    activeTab === "departments" ? filteredDepartments : filteredServices;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Navigation par onglets */}
          <div className="relative mb-8">
            <TabNavigation
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              departmentsCount={departments.length}
              servicesCount={services.length}
            />

            {/* Contrôles */}
            <Controls
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedDepartment={selectedDepartment}
              setSelectedDepartment={setSelectedDepartment}
              departments={departments}
              activeTab={activeTab}
              onAdd={handleAdd}
            />
          </div>

          {/* Grille de cartes */}
          {currentData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {activeTab === "departments"
                ? filteredDepartments.map((dept, index) => (
                    <DepartmentCard
                      key={dept.id}
                      department={dept}
                      servicesCount={getServicesCountByDepartment(dept.id)}
                      onEdit={(id) => handleEdit("department", id)}
                      onDelete={(id) => handleDelete("department", id)}
                      index={index}
                    />
                  ))
                : filteredServices.map((service, index) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      departmentName={getDepartmentName(service.departmentId)}
                      onEdit={(id) => handleEdit("service", id)}
                      onDelete={(id) => handleDelete("service", id)}
                      index={index}
                    />
                  ))}
            </div>
          ) : (
            <EmptyState activeTab={activeTab} searchTerm={searchTerm} />
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        type={modalType}
        mode={modalMode}
        formData={formData}
        setFormData={setFormData}
        departments={departments}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />

      {/* Styles CSS personnalisés */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.15;
          }
        }

        .grid > div {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .grid > div:nth-child(1) {
          animation-delay: 0.1s;
        }
        .grid > div:nth-child(2) {
          animation-delay: 0.2s;
        }
        .grid > div:nth-child(3) {
          animation-delay: 0.3s;
        }
        .grid > div:nth-child(4) {
          animation-delay: 0.4s;
        }
        .grid > div:nth-child(5) {
          animation-delay: 0.5s;
        }
        .grid > div:nth-child(6) {
          animation-delay: 0.6s;
        }

        /* Scrollbar personnalisée */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #dc2626, #d97706);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #b91c1c, #b45309);
        }

        /* Améliorations glassmorphism */
        .backdrop-blur-xl {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .backdrop-blur-sm {
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }

        /* Transitions élégantes */
        .transition-all {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Effets de boutons améliorés */
        .bg-gradient-to-r.from-red-500.to-red-700:hover {
          box-shadow: 0 10px 25px rgba(220, 38, 38, 0.4);
        }

        /* Effets de profondeur des cartes */
        .shadow-2xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25),
            0 0 0 1px rgba(255, 255, 255, 0.05);
        }

        /* Animations de bordure subtiles */
        @keyframes border-flow {
          0%,
          100% {
            border-color: rgba(220, 38, 38, 0.2);
          }
          50% {
            border-color: rgba(217, 119, 6, 0.3);
          }
        }

        .border-red-200 {
          animation: border-flow 4s ease-in-out infinite;
        }

        /* Animation de lueur rouge */
        @keyframes red-glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(220, 38, 38, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(220, 38, 38, 0.6);
          }
        }

        .group:hover .relative.bg-white\\/95 {
          animation: red-glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default DepartmentServiceManager;
