"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Star, User } from "lucide-react"

export default function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [registerForm, setRegisterForm] = useState({ name: "", email: "", password: "" })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulamos login exitoso
    setIsLoggedIn(true)
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulamos registro exitoso
    setIsLoggedIn(true)
  }

  if (isLoggedIn) {
    return <Dashboard />
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <MapPin className="h-8 w-8 text-orange-600" />
            </div>
          </div>
          <CardTitle className="text-2xl">RestaurantRate</CardTitle>
          <CardDescription>Descubre y califica los mejores restaurantes</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Registrarse</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Iniciar Sesión
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    placeholder="Tu nombre"
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder="tu@email.com"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password">Contraseña</Label>
                  <Input
                    id="reg-password"
                    type="password"
                    placeholder="••••••••"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Registrarse
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function Dashboard() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [userRatings, setUserRatings] = useState({})

  const restaurants = [
    {
      id: 1,
      name: "La Parrilla Dorada",
      cuisine: "Asados",
      address: "Av. Principal 123",
      lat: 40.7128,
      lng: -74.006,
      averageRating: 4.2,
      totalReviews: 156,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      name: "Sushi Zen",
      cuisine: "Japonesa",
      address: "Calle Sakura 45",
      lat: 40.7589,
      lng: -73.9851,
      averageRating: 4.7,
      totalReviews: 89,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      name: "Pasta Italiana",
      cuisine: "Italiana",
      address: "Via Roma 78",
      lat: 40.7505,
      lng: -73.9934,
      averageRating: 4.0,
      totalReviews: 203,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      name: "Tacos El Mariachi",
      cuisine: "Mexicana",
      address: "Plaza México 12",
      lat: 40.7282,
      lng: -74.0776,
      averageRating: 4.5,
      totalReviews: 127,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const handleRating = (restaurantId: number, rating: number) => {
    setUserRatings((prev) => ({
      ...prev,
      [restaurantId]: rating,
    }))
  }

  const StarRating = ({
    rating,
    onRate,
    restaurantId,
  }: { rating: number; onRate?: (rating: number) => void; restaurantId?: number }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            } ${onRate ? "cursor-pointer hover:text-yellow-400" : ""}`}
            onClick={() => onRate && restaurantId && onRate(star)}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <MapPin className="h-8 w-8 text-orange-600" />
              <h1 className="text-xl font-bold text-gray-900">RestaurantRate</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Bienvenido, Usuario</span>
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Perfil
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mapa */}
          <Card>
            <CardHeader>
              <CardTitle>Mapa de Restaurantes</CardTitle>
              <CardDescription>Explora restaurantes cerca de ti</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
                {/* Simulación de mapa */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Mapa Interactivo</p>
                      <p className="text-sm text-gray-400">Vista de restaurantes cercanos</p>
                    </div>
                  </div>

                  {/* Marcadores de restaurantes */}
                  {restaurants.map((restaurant, index) => (
                    <div
                      key={restaurant.id}
                      className={`absolute w-8 h-8 bg-red-500 rounded-full border-2 border-white shadow-lg cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform ${
                        selectedRestaurant?.id === restaurant.id ? "bg-orange-500 scale-110" : ""
                      }`}
                      style={{
                        left: `${20 + index * 15}%`,
                        top: `${30 + index * 10}%`,
                      }}
                      onClick={() => setSelectedRestaurant(restaurant)}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Restaurantes */}
          <Card>
            <CardHeader>
              <CardTitle>Restaurantes Disponibles</CardTitle>
              <CardDescription>Califica tu experiencia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {restaurants.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                      selectedRestaurant?.id === restaurant.id ? "border-orange-500 bg-orange-50" : "border-gray-200"
                    }`}
                    onClick={() => setSelectedRestaurant(restaurant)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{restaurant.name}</h3>
                        <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
                        <p className="text-xs text-gray-500">{restaurant.address}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{restaurant.averageRating}</span>
                        </div>
                        <p className="text-xs text-gray-500">({restaurant.totalReviews} reseñas)</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Tu calificación:</p>
                        <StarRating
                          rating={userRatings[restaurant.id] || 0}
                          onRate={(rating) => handleRating(restaurant.id, rating)}
                          restaurantId={restaurant.id}
                        />
                      </div>
                      {userRatings[restaurant.id] && (
                        <div className="text-sm text-green-600 font-medium">¡Calificado!</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detalles del restaurante seleccionado */}
        {selectedRestaurant && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>{selectedRestaurant.name}</CardTitle>
              <CardDescription>Información detallada del restaurante</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedRestaurant.image || "/placeholder.svg"}
                    alt={selectedRestaurant.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Información</h4>
                    <p className="text-gray-600">Cocina: {selectedRestaurant.cuisine}</p>
                    <p className="text-gray-600">Dirección: {selectedRestaurant.address}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Calificación General</h4>
                    <div className="flex items-center gap-2">
                      <StarRating rating={selectedRestaurant.averageRating} />
                      <span className="text-lg font-medium">{selectedRestaurant.averageRating}</span>
                      <span className="text-gray-500">({selectedRestaurant.totalReviews} reseñas)</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Tu Calificación</h4>
                    <StarRating
                      rating={userRatings[selectedRestaurant.id] || 0}
                      onRate={(rating) => handleRating(selectedRestaurant.id, rating)}
                      restaurantId={selectedRestaurant.id}
                    />
                    {userRatings[selectedRestaurant.id] && (
                      <p className="text-sm text-green-600 mt-1">
                        Has calificado este restaurante con {userRatings[selectedRestaurant.id]} estrella
                        {userRatings[selectedRestaurant.id] !== 1 ? "s" : ""}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
